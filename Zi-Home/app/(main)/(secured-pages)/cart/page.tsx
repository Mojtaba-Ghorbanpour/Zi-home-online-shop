"use client";

import CartCard from "@/components/cart-component/cart-card";
import { Divider } from "@heroui/react";

export default function Cart() {
  return (
    <div className="px-28 space-y-10">
      <h3 className="text-2xl font-semibold">سبد خرید</h3>
      <Divider orientation="horizontal" />
      <CartCard />
    </div>
  );
}
