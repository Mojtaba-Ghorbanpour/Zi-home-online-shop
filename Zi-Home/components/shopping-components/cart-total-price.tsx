"use client";

import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { addToast } from "@heroui/react"; // مهم

interface ICartItem {
  product: string;
  name: string;
  count: number;
  price: number;
  thumbnail: string;
}
const CartTotalPrice: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const items: ICartItem[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]",
    );
    const total = items.reduce((sum, item) => sum + item.price * item.count, 0);
    setTotalPrice(total);
  }, []);
  const handleFinalOrder = () => {
    addToast({
      title: "درگاه پرداخت در دسترس نیست",
      description: "لطفاً بعداً دوباره تلاش کنید.",
      color: "danger",
      timeout: 3000,
      shouldShowTimeoutProgress: true,
    });
  };
  return (
    <div className="px-4 w-full rounded-lg font-medium text-lg justify-between space-y-2 items-center flex flex-col">
      <p>
        قیمت کل:{" "}
        <span className="text-danger-500">
          {new Intl.NumberFormat("fa-IR").format(totalPrice)} تومان
        </span>
      </p>

      <Button color="danger" className="font-medium" onPress={handleFinalOrder}>
        ثبت سفارش نهایی
      </Button>
    </div>
  );
};

export default CartTotalPrice;
