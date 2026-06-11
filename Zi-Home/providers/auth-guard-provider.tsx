"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";

const AuthGuard: React.FC<IChildren> = ({ children }) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("tokenName");

      if (!token) {
        addToast({
          title: `لطفا ابتدا وارد شوید`,
          color: "danger",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
        router.push("/login");
      } else {
        setChecked(true);
      }
    }
  }, [router]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
