// server.js
const { join } = require('node:path');
const { createServer } = require('node:http');
const dotenv = require('dotenv');

//
// 1) Load env
//
const result = dotenv.config({ path: join(__dirname, './config.env') });
if (result.error) {
  console.error('[-] dotenv error:', result.error);
  process.exit(1);
}

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Basic ENV validation
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  console.error(`[-] Invalid PORT: ${process.env.PORT}`);
  process.exit(1);
}

//
// 2) Global error traps (keep first to catch early problems)
//
process.on('unhandledRejection', (err) => {
  console.error('[-] Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('[-] Uncaught Exception:', err);
  // In production بهتره پروسه ری‌استارت شود (با pm2/systemd)
  process.exit(1);
});

//
// 3) Load app
//
let app;
try {
  ({ app } = require('./app'));
} catch (e) {
  console.error('[-] Failed to load app.js:', e);
  process.exit(1);
}

//
// 4) Create HTTP server with safe timeouts
//
const server = createServer(app);

// ضد Slowloris: headersTimeout > keepAliveTimeout
server.keepAliveTimeout = 65_000; // 65s
server.headersTimeout   = 66_000; // must be > keepAliveTimeout
server.requestTimeout   = 0;      // 0 = Node default (no per-request timeout); تنظیم بنا به نیاز

//
// 5) Track connections for graceful shutdown
//
const sockets = new Set();
server.on('connection', (socket) => {
  sockets.add(socket);
  socket.on('close', () => sockets.delete(socket));
});

//
// 6) Start listening
//
server.listen(PORT, HOST, () => {
  console.info(`[i] Environment:         ${NODE_ENV}`);
  console.info(`[i] Server running at:   http://${HOST}:${PORT}`);
  console.info(`[i] Swagger UI:          http://${HOST}:${PORT}/api-docs`);
  console.info(`[i] Health check:        http://${HOST}:${PORT}/_health`);
  console.info(`[i] Press Ctrl+C to stop.`);
});

//
// 7) Graceful shutdown
//
let isShuttingDown = false;
async function shutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.info(`\n[i] Received ${signal}. Shutting down gracefully...`);

  // (اختیاری) اگر فانکشن قطع ارتباط دیتابیس دارید، اینجا صدا بزنید:
  // try { await require('./database/database-connection').disconnect?.(); } catch(e){ console.error(e); }

  // توقف پذیرش کانکشن جدید
  server.close((err) => {
    if (err) {
      console.error('[-] Error during server.close():', err);
      process.exit(1);
    }
    // بستن کانکشن‌های باز مانده
    for (const socket of sockets) {
      try { socket.destroy(); } catch (_) {}
    }
    console.info('[i] Server closed. Bye 👋');
    process.exit(0);
  });

  // سقف زمان برای shutdown تمیز (اجباری نیست؛ 10s)
  setTimeout(() => {
    console.warn('[/] Force exit after timeout.');
    process.exit(1);
  }, 10_000).unref();
}

['SIGINT', 'SIGTERM'].forEach((sig) => {
  process.on(sig, () => shutdown(sig));
});

module.exports = { server };
