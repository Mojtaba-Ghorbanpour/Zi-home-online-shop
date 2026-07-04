"use client";

import CartSummary from "@/components/shopping-components/shopping-product";
import UserAddress from "@/components/shopping-components/user-address";
import PersianCalendar from "@/components/shopping-components/user-order-date";
import { BackArrowIcon } from "@/public/svgs/icons";
import Link from "next/link";
export default function ShoppingPage() {
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
        </div>

        <PersianCalendar />
      </div>
    </div>
  );
}
