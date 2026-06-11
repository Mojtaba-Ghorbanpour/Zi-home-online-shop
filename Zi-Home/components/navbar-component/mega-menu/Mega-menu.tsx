"use client";

import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Divider } from "@heroui/react";
import {
  HeartIcon,
  QuestionIcon,
  SparkIcon,
  StarIcon,
  TrophyIcon,
} from "@/public/svgs/icons";
import Link from "next/link";
import MegaMenuCategories from "./maega-menu-categories";
const MegaMenu = () => {
  return (
    <Navbar maxWidth="xl" className="bg-white">
      <NavbarContent justify="center" className="w-full flex gap-4">
        <MegaMenuCategories />
        <Divider orientation="vertical" className="h-6" />
        <NavbarContent justify="center">
          <NavbarItem>
            <Link className="flex gap-1 text-sm font-medium" href="/hot">
              <SparkIcon />
              شگفت انگیزها
            </Link>
          </NavbarItem>
        </NavbarContent>
        <Divider orientation="vertical" className="h-6" />
        <NavbarContent justify="center">
          <NavbarItem>
            <Link className="flex gap-1 text-sm font-medium" href="/trends">
              <StarIcon />
              ترند ترین
            </Link>
          </NavbarItem>
        </NavbarContent>
        <Divider orientation="vertical" className="h-6" />
        <NavbarContent justify="center">
          <NavbarItem>
            <Link className="flex gap-1 text-sm font-medium" href="/top">
              <TrophyIcon />
              پرفروش ترین ها
            </Link>
          </NavbarItem>
        </NavbarContent>
        <Divider orientation="vertical" className="h-6" />
        <NavbarContent justify="center">
          <NavbarItem>
            <Link className="flex gap-1 text-sm font-medium" href="/popular">
              <HeartIcon />
              محبوب ترین
            </Link>
          </NavbarItem>
        </NavbarContent>
        <Divider orientation="vertical" className="h-6" />
        <NavbarContent>
          <NavbarItem>
            <Link className="flex gap-1 text-sm font-medium" href="/FAQ">
              <QuestionIcon />
              سوالات شما
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>
    </Navbar>
  );
};

export default MegaMenu;
