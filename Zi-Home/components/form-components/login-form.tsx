"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Input, Button, addToast } from "@heroui/react";
import Link from "next/link";
import {
  UserIcon,
  CloseEyeIcon,
  OpenEyeIcon,
  BackArrowIcon,
  ValidUser,
  InvalidUser,
} from "@/public/svgs/icons";
import { loginSchema } from "@/validation/login-verification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginCheck } from "@/app/apis/auth.api";

type TLoginFormData = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: TLoginFormData) => {
    try {
      const response = await loginCheck(data);
      const username = data.username;
      if (response.status === 200) {
        addToast({
          title: `${username} خوش آمدید`,
          color: "success",
          icon: <ValidUser />,
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
        localStorage.setItem("tokenName", response.data.token.accessToken);
        localStorage.setItem("userId", response.data.data.user._id);
        localStorage.setItem("role", response.data.data.user.role);

        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      addToast({
        title: `نام کاربری یا رمز عبور اشتباه است`,
        color: "danger",
        timeout: 3000,
        icon: <InvalidUser />,
        shouldShowTimeoutProgress: true,
      });
    }
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4 bg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="">
          <Link href="/">
            <BackArrowIcon />
          </Link>
        </div>
        <div className="text-center space-y-4">
          <p className="text-xl font-bold">ورود</p>
          <p>اطلاعات خود را وارد کنید</p>
        </div>
      </div>
      <div className="w-full">
        <Input
          {...register("username")}
          name="username"
          placeholder="نام کاربری"
          type="text"
          size="lg"
          endContent={<UserIcon />}
          className="text-lg font-semibold"
        />
        {
          <p
            className={`text-red-500 text-sm font-semibold ${
              errors.username ? "visible" : "invisible"
            }`}
          >
            {errors.username ? errors.username.message : "خطا"}
          </p>
        }
      </div>
      <div className="w-full">
        <Input
          {...register("password")}
          name="password"
          className="max-w-xs text-lg font-semibold"
          endContent={
            <button
              className="focus:outline-solid outline-transparent"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? <OpenEyeIcon /> : <CloseEyeIcon />}
            </button>
          }
          placeholder="رمز عبور"
          type={isVisible ? "text" : "password"}
          size="lg"
        />
        <p
          className={`text-red-500 text-sm font-semibold ${
            errors.password ? "visible" : "invisible"
          }`}
        >
          {errors.password ? errors.password.message : "خطا"}
        </p>
      </div>

      <div className="flex gap-2 items-center justify-center w-full">
        <Button
          type="submit"
          variant="flat"
          fullWidth
          className="bg-primary-600 text-white text-lg flex justify-center items-center"
        >
          ورود
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
