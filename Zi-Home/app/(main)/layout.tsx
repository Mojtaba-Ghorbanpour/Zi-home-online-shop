"use client";

import AppFooter from "@/components/footer-component/footer";
import AppNavBar from "@/components/navbar-component/AppNavbar";
import { ReactQueryProvider } from "@/providers/react-query-provider";

const MainLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      <ReactQueryProvider>
        <AppNavBar />
        <main className="mx-auto mt-44">{children}</main>
        <AppFooter />
      </ReactQueryProvider>
    </>
  );
};

export default MainLayout;
