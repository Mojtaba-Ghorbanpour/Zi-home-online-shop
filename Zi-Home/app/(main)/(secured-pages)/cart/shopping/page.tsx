"use client";

import { useRouter } from "next/navigation";
// import { addOrder } from "@/app/apis/order.api"; // ❌ دیگر اینجا لازم نیست
import CartSummary from "@/components/shopping-components/shopping-product";
import UserAddress from "@/components/shopping-components/user-address";
import PersianCalendar from "@/components/shopping-components/user-order-date";
import { BackArrowIcon } from "@/public/svgs/icons";
import Link from "next/link";
// import { useState } from "react"; // ❌ حذف شد
// import { Button } from "@heroui/react"; // ❌ دکمه ثبت نهایی حذف شد

export default function ShoppingPage() {
  const router = useRouter();

  return (
    <div className="px-28 flex flex-col gap-10">
      <div>
        <Link href="/cart">
          <BackArrowIcon />
        </Link>
      </div>

      <UserAddress />

      <div className="flex">
        <div className="w-full flex flex-col justify-between gap-5">
          <div className="w-full p-2 h-full overflow-y-auto">
            <CartSummary />
          </div>

          {/* ❌ دکمه «ثبت نهایی سفارش» حذف شد */}
          {/* در صورت نیاز می‌تونی فقط لینک ادامه به پرداخت داشته باشی: */}
          {/* <button
            onClick={() => router.push("/cart/shopping/payment")}
            className="w-fit bg-gray-100 text-gray-800 px-4 py-2 rounded"
          >
            ادامه به مرحله پرداخت
          </button> */}
        </div>

        <PersianCalendar />
      </div>
    </div>
  );
}
