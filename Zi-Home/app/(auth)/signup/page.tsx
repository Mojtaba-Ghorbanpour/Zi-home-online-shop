import SignupForm from "@/components/form-components/signup-form";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="space-y-2">
      <SignupForm />
      <p className="text-sm font-medium">
        در صورت داشتن حساب کاربری{" "}
        <Link href={"/login"} className="text-danger-500">
          وارد شوید
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
