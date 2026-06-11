"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Input, Button, addToast, Textarea } from "@heroui/react";
import Link from "next/link";
import {
  UserIcon,
  CloseEyeIcon,
  OpenEyeIcon,
  BackArrowIcon,
  ValidUser,
  InvalidUser,
} from "@/public/svgs/icons";
import { signupSchema } from "@/validation/login-verification";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupAccount } from "@/app/apis/auth.api";
import { useRouter } from "next/navigation";

type TSignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupFormData>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: TSignupFormData) => {
    console.log(data);

    try {
      const response = await signupAccount(data as any);
      const username = data.username;
      if (response.status === 201) {
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
      className="w-full max-w-sm flex flex-col gap-2 bg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col gap-2">
        <div className="">
          <Link href="/">
            <BackArrowIcon />
          </Link>
        </div>
        <div className="text-center space-y-4">
          <p className="text-xl font-bold">ثبت نام</p>
        </div>
      </div>
      <div className="w-full flex gap-4">
        <div className="w-1/2">
          <Input
            {...register("firstname")}
            name="firstname"
            placeholder="نام"
            type="text"
            size="lg"
            className="text-lg font-semibold"
          />
          {
            <p
              className={`text-red-500 text-sm font-semibold ${
                errors.firstname ? "visible" : "invisible"
              }`}
            >
              {errors.firstname ? errors.firstname.message : "خطا"}
            </p>
          }
        </div>
        <div className="w-1/2">
          <Input
            {...register("lastname")}
            name="lastname"
            placeholder="نام خانوادگی"
            type="text"
            size="lg"
            className="text-lg font-semibold"
          />
          {
            <p
              className={`text-red-500 text-sm font-semibold ${
                errors.lastname ? "visible" : "invisible"
              }`}
            >
              {errors.lastname ? errors.lastname.message : "خطا"}
            </p>
          }
        </div>
      </div>
      <div className="w-full flex gap-4">
        <div className="w-1/2">
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
        <div className="w-1/2">
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
      </div>
      <div className="w-full">
        <Input
          {...register("phoneNumber")}
          name="phoneNumber"
          fullWidth
          className="text-lg font-semibold"
          placeholder="شماره تماس"
          type="number"
          size="lg"
        />
        <p
          className={`text-red-500 text-sm font-semibold ${
            errors.phoneNumber ? "visible" : "invisible"
          }`}
        >
          {errors.phoneNumber ? errors.phoneNumber.message : "خطا"}
        </p>
      </div>
      <div className="w-full">
        <Textarea fullWidth label="آدرس" {...register("address")} maxRows={3} />
        <p
          className={`text-red-500 text-sm font-semibold ${
            errors.address ? "visible" : "invisible"
          }`}
        >
          {errors.address ? errors.address.message : "خطا"}
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

export default SignupForm;
