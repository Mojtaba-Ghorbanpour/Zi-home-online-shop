// app.js
const { join } = require('node:path');
const cors = require('cors');
const express = require('express');

const { connectToDatabase } = require('./database/database-connection');
const { AppError } = require('./utils/app-error');
const { addAdmin } = require('./utils/add-admin');

const apiRouter = require('./routers/api-router');
const { swaggerUi, specs } = require('./swagger/swagger');

const app = express();

// اگر پشت پروکسی هستی (Nginx/Cloudflare)
app.set('trust proxy', true);

// به کش‌های میانی بگو با Origin تفاوت دارد
app.use((req, res, next) => {
  res.setHeader('Vary', 'Origin');
  next();
});

// --- CORS: اجازه به localhost / 127.0.0.1 / ::1 و درخواست‌های بدون Origin
const allowOrigin = (origin) => {
  if (!origin) return true; // curl / swagger داخلی
  try {
    const { hostname } = new URL(origin);
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1' || hostname === '[::1]';
  } catch {
    return false;
  }
};

const corsOptions = {
  origin(origin, cb) {
    const ok = allowOrigin(origin);
    cb(ok ? null : new Error('Not allowed by CORS'), ok);
  },
  methods: ['GET','HEAD','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','Accept','X-Requested-With'],
  credentials: false,   // اگر کوکی لازم شد: true + origin را محدودتر کن
  maxAge: 86400,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight

// پارسرها و استاتیک
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, './public')));

// health
app.get('/_health', (_, res) => res.status(200).send('ok'));

// دیتابیس (غیربلاکه‌کنندهٔ بوت)
(async () => {
  try {
    await connectToDatabase();
    await addAdmin();
    console.info('[i] Database connected and admin ensured');
  } catch (err) {
    console.error('[-] Database init failed:', err);
  }
})();

// --- Swagger: JSON داینامیک با همان origin صفحه
const clone = (o) => JSON.parse(JSON.stringify(o));

app.get('/swagger.json', (req, res) => {
  const spec = clone(specs);
  const origin = `${req.protocol}://${req.get('host')}`; // مثلا http://localhost:8000
  // چون مسیرهای شما از قبل با /api شروع می‌شوند، همین origin کافی‌ست
  spec.servers = [{ url: origin, description: 'Dynamic same-origin server' }];
  res.status(200).json(spec);
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(null, {
    explorer: true,
    swaggerOptions: { url: '/swagger.json' },
  })
);

// API
app.use('/api', apiRouter);

// 404
app.all('*', (req, res, next) => {
  next(new AppError(404, `Can't find ${req.method} ${req.originalUrl}`));
});

// Error Handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

module.exports = { app };
