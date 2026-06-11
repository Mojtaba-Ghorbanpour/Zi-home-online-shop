import { z } from "zod";

export const EditProductSchema = z.object({
  name: z.string().trim().min(3, "نام محصول نا معتبر است"),
  price: z.number().min(10000, "قیمت باید حداقل 10000 باشد"),
  quantity: z.number().min(1, "تعداد باید بیشتر از 0 باشد"),
  brand: z.string().trim().min(3, "نام برند باید حداقل ۳ حرف باشد"),
  category: z.string().trim().nonempty("دسته‌بندی نباید خالی باشد"),
  subcategory: z.string().trim().nonempty("زیر دسته‌بندی نمی‌تواند خالی باشد"),
  description: z
    .string()
    .trim()
    .nonempty("توضحات محصول نمیتواند خالی باشد")
    .min(10, "توضیحات محصول حد اقل باید 10 کارکتر باشد"),
  thumbnail: z
    .any()
    .optional()
    .refine(
      (files: FileList | undefined) =>
        !files?.[0] ||
        ["image/png", "image/jpg", "image/jpeg"].includes(files[0].type),
      "فرمت فایل باید png یا jpg یا jpeg باشد"
    )
    .refine(
      (files: FileList | undefined) =>
        !files?.[0] || files[0].size <= 5 * 1024 * 1024,
      "حجم فایل نباید بیشتر از 5 مگابایت باشد"
    ),
});

export const AddProductSchema = z.object({
  name: z.string().trim().min(3, "نام محصول نامعتبر است"),
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "تعداد معتبر نیست" })
    .refine((val) => Number(val) >= 10000, {
      message: "قیمت باید بیشتر از 10,000 باشد",
    }),
  quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "تعداد معتبر نیست" })
    .refine((val) => Number(val) >= 1, {
      message: "تعداد باید بیشتر از 1 باشد",
    }),
  brand: z.string().trim().min(3, "نام برند باید حداقل ۳ حرف باشد"),
  category: z
    .string("دسته‌بندی را انتخاب کنید")
    .trim()
    .nonempty("دسته‌بندی نباید خالی باشد"),
  subcategory: z
    .string("زیر دسته‌بندی را انتخاب کنید")
    .trim()
    .nonempty("زیر دسته‌بندی نباید خالی باشد")
    .refine((val) => val.length > 2, {
      message: "زیر دسته‌ بندی باید بیشتر از دو کاراکتر باشد",
    }),
  description: z
    .string()
    .trim()
    .min(10, "توضیحات محصول حداقل باید 10 کارکتر باشد"),
  thumbnail: z
    .any()
    .refine(
      (files: FileList | undefined) => !!files?.[0],
      "لطفاً فایل را انتخاب کنید"
    )
    .refine(
      (files: FileList | undefined) =>
        !!files?.[0] &&
        ["image/png", "image/jpg", "image/jpeg"].includes(files[0].type),
      "فرمت فایل باید png یا jpg یا jpeg باشد"
    )
    .refine(
      (files: FileList | undefined) =>
        !!files?.[0] && files[0].size <= 5 * 1024 * 1024,
      "حجم فایل نباید بیشتر از 5 مگابایت باشد"
    ),
});
