"use client";

import AdminNavbar from "@/components/navbar-component/AdminNavbar";
import AdminGuard from "@/providers/admin-guard-provider";
import { ReactQueryProvider } from "@/providers/react-query-provider";

const MainLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      <AdminGuard>
        <AdminNavbar />
        <ReactQueryProvider>
          <main className="p-5 flex flex-col justify-center w-full h-full">
            {children}
          </main>
        </ReactQueryProvider>
      </AdminGuard>
    </>
  );
};

export default MainLayout;
