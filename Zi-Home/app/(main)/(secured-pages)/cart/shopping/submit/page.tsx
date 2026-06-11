"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SubmitPage() {
  const router = useRouter();

  useEffect(() => {
    alert("🚨 Submit page loaded!");
    const testId = "ORDER_" + Date.now();
    localStorage.setItem("lastOrderId", testId);
    setTimeout(() => {
      router.replace(`/cart/shopping/payment?orderId=${testId}`);
    }, 3000);
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600">Submit page active</h1>
    </div>
  );
}
