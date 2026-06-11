"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";

export function HeroProviders({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider className="h-full">
      <ToastProvider placement="top-right" />
      {children}
    </HeroUIProvider>
  );
}
