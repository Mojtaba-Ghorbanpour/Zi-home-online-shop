import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(5, "نام کاربری نامعتبر است"),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "رمز عبور نامعتبر است"
    ),
});

export const signupSchema = z.object({
  firstname: z.string().trim().min(3, "نام خود را وارد کنید"),
  lastname: z.string().trim().min(4, "نام خانوادگی را وارد کنید"),
  username: z.string().trim().min(5, "نام کاربری نامعتبر است"),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "۸ کاراکتر با عدد، حروف و نماد"
    ),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره تلفن نامعتبر است"),
  address: z
    .string()
    .trim()
    .min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد")
    .max(200, "آدرس نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد")
    .regex(
      /^[\u0600-\u06FFa-zA-Z0-9\s.,\-_/]+$/,
      "آدرس شامل کاراکتر نامعتبر است"
    ),
});
