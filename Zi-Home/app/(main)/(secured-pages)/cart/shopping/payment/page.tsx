"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type IOrder } from "@/app/apis/order.api";

export default function PaymentPage() {
  const router = useRouter();

  const [status, setStatus] = useState("در حال ثبت سفارش جدید...");
  const [order, setOrder] = useState<IOrder | null>(null);
  const [isError, setIsError] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    console.log(msg);
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const createNewOrder = async (): Promise<IOrder> => {
    try {
      addLog("🔥 شروع ساخت سفارش جدید");

      const userId = localStorage.getItem("userId");
      const rawCart = localStorage.getItem("cartItems");
      if (!userId || !rawCart) throw new Error("کاربر یا سبد خرید خالی است");

      const cartItems = JSON.parse(rawCart);
      if (!Array.isArray(cartItems) || cartItems.length === 0) throw new Error("سبد خالی");

      const products = cartItems.map((item: any) => ({
        product: typeof item.product === "object" ? item.product._id : item.product,
        count: parseInt(item.count || item.quantity || "1"),
      }));

      const orderData = {
        user: userId,
        products,
        deliveryStatus: false,
      };

      // جلوگیری از تکرار
      if (localStorage.getItem("orderInProgress")) {
        throw new Error("سفارش در حال پردازش است.");
      }
      localStorage.setItem("orderInProgress", "true");

      const res = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      addLog(`📡 پاسخ سرور: ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const result = await res.json();
      const newOrder = result?.data?.order;

      if (!newOrder?._id) throw new Error("پاسخ API معتبر نیست");

      localStorage.setItem("lastOrder", JSON.stringify(newOrder));
      localStorage.setItem("lastOrderId", newOrder._id);
      localStorage.setItem("orderTimestamp", Date.now().toString());
      localStorage.removeItem("cartItems");

      addLog(`✅ سفارش ساخته شد: ${newOrder._id}`);
      return newOrder;
    } catch (err: any) {
      localStorage.removeItem("orderInProgress");
      addLog(`❌ خطا: ${err.message}`);
      throw err;
    }
  };

  useEffect(() => {
    const process = async () => {
      try {
        const newOrder = await createNewOrder();
        setOrder(newOrder);
        setStatus("✅ سفارش ثبت شد!");
      } catch (err: any) {
        setStatus(`❌ خطا: ${err.message}`);
        setIsError(true);
      }
    };

    process();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">وضعیت پرداخت</h1>
      <div className={`p-4 rounded-lg mb-6 text-center ${
        isError ? "bg-red-100 text-red-700" :
        status.includes("✅") ? "bg-green-100 text-green-700" :
        "bg-blue-100 text-blue-700"
      }`}>
        <p className="text-lg font-medium">{status}</p>
      </div>

      {/* لاگ‌ها */}
      <div className="bg-gray-100 p-4 mb-6 rounded text-sm max-h-64 overflow-auto">
        <h3 className="font-semibold mb-2">📋 لاگ:</h3>
        {logs.map((log, i) => (
          <div key={i} className="mb-1 font-mono">{log}</div>
        ))}
      </div>

      {/* جزئیات سفارش */}
      {order && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-bold mb-2">جزئیات سفارش</h2>
          <p><strong>شناسه:</strong> {order._id}</p>
          <p><strong>تعداد کالا:</strong> {order.products?.length}</p>
          <p><strong>مبلغ کل:</strong> {order.totalPrice?.toLocaleString("fa-IR")} تومان</p>
        </div>
      )}

      <div className="text-center space-x-2 space-x-reverse">
        <button onClick={() => router.push("/")} className="bg-blue-600 text-white px-4 py-2 rounded">خانه</button>
        <button onClick={() => router.push("/cart")} className="bg-green-600 text-white px-4 py-2 rounded">سبد خرید</button>
        {isError && (
          <button onClick={() => window.location.reload()} className="bg-gray-600 text-white px-4 py-2 rounded">🔄 تلاش مجدد</button>
        )}
      </div>
    </div>
  );
}
