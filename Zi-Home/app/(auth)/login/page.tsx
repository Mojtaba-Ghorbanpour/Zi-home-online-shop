"use client";
import LoginForm from "@/components/form-components/login-form";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="space-y-2">
      <LoginForm />
      <p className="text-sm font-medium">
        در صورت نداشتم حساب کاربری{" "}
        <Link href={"/signup"} className="text-danger-500">
          ثبت نام کنید
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
