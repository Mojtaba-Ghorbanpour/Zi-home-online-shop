"use client";

import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";
import Image from "next/image";
import { Divider } from "@heroui/react";
import { CartIcon } from "@/public/svgs/icons";
import Link from "next/link";
import MegaMenu from "./mega-menu/Mega-menu";
import DropdownAction from "./dropdown/dropdown-action";

const AppNavBar = () => {
  return (
    <header className="fixed top-0 z-10 w-full">
      <Navbar maxWidth="xl" isBordered className="py-3 bg-white">
        <NavbarContent justify="start" className="w-full flex gap-4">
          <NavbarBrand className="flex max-w-fit">
            <Link href={"/"}>
              <Image
                src="/App-logo/logo.png"
                alt="zi_home_logo"
                width={125}
                height={56}
              />
            </Link>
          </NavbarBrand>
          <NavbarContent as="div" justify="end">
            <DropdownAction />
            <Divider orientation="vertical" className="h-7" />
            <Link href={"/cart"} className="">
              <CartIcon />
            </Link>
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      <MegaMenu />
    </header>
  );
};

export default AppNavBar;
