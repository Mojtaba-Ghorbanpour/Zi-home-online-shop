"use client";

import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import { Tab, Tabs } from "@heroui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoutModal from "../modal-component/logout-modal";

const AdminNavBar = () => {
  const pathname = usePathname();

  return (
    <Navbar maxWidth="xl" isBordered className="py-3">
      <NavbarContent justify="start" className="w-full flex gap-4">
        <NavbarBrand className="flex gap-2 align-middle max-w-2/12">
          <Image
            src="/App-logo/logo.png"
            alt="zi_home_logo"
            width={125}
            height={56}
          />
        </NavbarBrand>
        <NavbarContent>
          <Tabs
            selectedKey={pathname}
            color="danger"
            variant="underlined"
            fullWidth
          >
            <Tab
              key="/dashboard/products-management"
              title="مدیریت کالا ها"
              href="/dashboard/products-management"
              className="font-semibold"
            ></Tab>
            <Tab
              key="/dashboard/warehouse-management"
              title="موجودی و  قیمت ها"
              href="/dashboard/Inventory-management"
              className="font-semibold"
            ></Tab>
            <Tab
              key="/dashboard/orders-management"
              title="سفارش ها"
              href="/dashboard/orders-management"
              className="font-semibold"
            ></Tab>
          </Tabs>
        </NavbarContent>
        <NavbarContent justify="end" className="max-w-1/12 gap-2">
          <LogoutModal />
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
};

export default AdminNavBar;
