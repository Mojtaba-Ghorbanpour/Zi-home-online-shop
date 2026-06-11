"use client";

import AuthGuard from "@/providers/auth-guard-provider";

const SecuredPagesLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      <AuthGuard>{children}</AuthGuard>
    </>
  );
};

export default SecuredPagesLayout;
