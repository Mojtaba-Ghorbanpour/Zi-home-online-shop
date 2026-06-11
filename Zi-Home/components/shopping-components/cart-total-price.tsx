"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
    const items: ICartItem[] = JSON.parse(localStorage.getItem("cartItems") || "[]");

    const total = items.reduce((sum, item) => {
      return sum + (item.price * item.count);
    }, 0);

    setTotalPrice(total);
  }, []);

  return (
    <div className="px-4 w-full rounded-lg font-medium text-lg justify-between space-y-2 items-center flex flex-col">
      <p>
        قیمت کل:{" "}
        <span className="text-danger-500">
          {new Intl.NumberFormat("fa-IR").format(totalPrice)} تومان
        </span>
      </p>
      <Button color="danger" className="font-medium">
        <Link href="/cart/shopping/payment">ثبت سفارش نهایی</Link>
      </Button>
    </div>
  );
};

export default CartTotalPrice;
