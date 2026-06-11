import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import { HeroProviders } from "@/providers/hero-providers";

const RubikFont = Rubik({
  variable: "--font-Rubik",
  subsets: ["arabic"],
});

const InterFont = Inter({
  variable: "--font-Inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zi Home",
  description: "Zi Home Online Shop",
  icons: "/App-logo/logo.png",
};

const RootLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${RubikFont.variable} ${InterFont.variable} w-screen min-h-screen relative antialiased`}
      >
        <HeroProviders>{children}</HeroProviders>
      </body>
    </html>
  );
};

export default RootLayout;
