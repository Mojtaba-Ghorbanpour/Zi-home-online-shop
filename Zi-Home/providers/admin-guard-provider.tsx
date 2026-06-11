"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";

const AdminGuard: React.FC<IChildren> = ({ children }) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("tokenName");
    const role = localStorage.getItem("role");
    if (!token) {
      addToast({
        title: "لطفا ابتدا وارد شوید",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      router.push("/login");
      return;
    }

    if (role !== "ADMIN") {
      addToast({
        title: "دسترسی غیرمجاز به پنل ادمین",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      router.push("/");
      return;
    }

    setChecked(true);
  }, [router]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};

export default AdminGuard;
