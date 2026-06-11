"use client";

import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { AddProductSchema } from "@/validation/product-validation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { allCategories } from "@/app/apis/category.api";
import React from "react";
import { allSubcategories } from "@/app/apis/subcategory.api";
import { addProducts } from "@/app/apis/product.api";

type ProductFormData = z.infer<typeof AddProductSchema>;

const AddProductModal = ({ onClose }: { onClose: () => void }) => {
  const queryClient = useQueryClient();

  const { data, isLoading: isLoadingCategory, isError: isErrorCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: allCategories,
  });
  const categories = data?.data?.data?.categories || [];

  const { data: subCat, isLoading: isLoadingSubcategory, isError: isErrorSubcategory } = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => allSubcategories(1, 20),
  });
  const subcategories = subCat?.data?.data?.subcategories || [];

  const [disable, setDisable] = React.useState(true);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(AddProductSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => addProducts(formData),
    onSuccess: () => {
      // بسته شدن مودال و invalidate بعد از موفقیت
      queryClient.invalidateQueries({ queryKey: ["AddProducts"] });
      addToast({ title: "محصول با موفقیت اضافه شد", color: "success" });
      onClose();
    },
    onError: async (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "خطا در افزودن محصول";
      addToast({ title: message, color: "danger" });
      console.error("Add product failed:", error?.response?.data || error);
    },
  });

  const onSubmit = (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("price", String(data.price));
    formData.append("quantity", String(data.quantity));
    formData.append("category", data.category);       // باید ObjectId معتبر باشد
    formData.append("subcategory", data.subcategory); // باید ObjectId معتبر باشد
    formData.append("description", data.description);

    // ⬇️ مهم: گرفتن File واقعی از Controller
    const fileList = (data as any).thumbnail as FileList | undefined;
    const file = fileList?.[0];
    if (file) {
      formData.append("thumbnail", file, file.name);
      // اگر فعلاً نمی‌خوای گالری بفرستی، این خط را نذار
      // formData.append("images", file, file.name);
    }

    mutate(formData);
  };

  if (isLoadingCategory || isLoadingSubcategory) return <p>در حال بارگذاری...</p>;
  if (isErrorCategory || isErrorSubcategory) return <p>خطا در دریافت داده‌ها</p>;

  return (
    <Modal backdrop="opaque" isOpen={true} onOpenChange={onClose} size="md">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 items-center text-lg">
            افزودن محصول
          </ModalHeader>
          <ModalBody>
            <form
              id="add-product-form"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              {/* ⬇️ فایل با Controller تا FileList درست وارد فرم شود */}
              <div>
                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="تصویر کالا"
                      accept=".png, .jpg, .jpeg"
                      type="file"
                      onChange={(e) => {
                        const files = (e.target as HTMLInputElement).files || undefined;
                        // RHF انتظار دارد value همان FileList باشد
                        field.onChange(files);
                        setDisable(false);
                      }}
                      // Input کتابخانه‌ها معمولاً value کنترل‌شده برای فایل نمی‌گیرند:
                      // پس عمداً value/checked ست نکن.
                      size="md"
                    />
                  )}
                />
                <p className={`text-red-500 text-sm font-medium ${errors.thumbnail ? "visible" : "invisible"}`}>
                  {(errors.thumbnail as any)?.message || "خطا"}
                </p>
              </div>

              <div className="w-full flex gap-5">
                <div className="w-1/2">
                  <Input
                    label="نام محصول"
                    type="text"
                    {...register("name", { onChange: () => setDisable(false) })}
                    size="md"
                  />
                  <p className={`text-red-500 text-sm font-medium ${errors.name ? "visible" : "invisible"}`}>
                    {errors.name?.message || "خطا"}
                  </p>
                </div>
                <div className="w-1/2">
                  <Input
                    label="برند"
                    type="text"
                    {...register("brand", { onChange: () => setDisable(false) })}
                    size="md"
                  />
                  <p className={`text-red-500 text-sm font-medium ${errors.brand ? "visible" : "invisible"}`}>
                    {errors.brand?.message || "خطا"}
                  </p>
                </div>
              </div>

              <div className="w-full flex gap-5">
                <div className="w-1/2">
                  <Input
                    label="قیمت"
                    type="number"
                    {...register("price", { onChange: () => setDisable(false) })}
                    size="md"
                  />
                  <p className={`text-red-500 text-sm font-medium ${errors.price ? "visible" : "invisible"}`}>
                    {errors.price?.message || "خطا"}
                  </p>
                </div>
                <div className="w-1/2">
                  <Input
                    label="تعداد"
                    type="number"
                    {...register("quantity", { onChange: () => setDisable(false) })}
                    size="md"
                  />
                  <p className={`text-red-500 text-sm font-medium ${errors.quantity ? "visible" : "invisible"}`}>
                    {errors.quantity?.message || "خطا"}
                  </p>
                </div>
              </div>

              <div className="w-full flex gap-5">
                <div className="w-1/2">
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        size="lg"
                        items={categories}
                        placeholder="دسته‌بندی‌ها"
                        selectedKeys={field.value ? new Set([field.value]) : new Set()}
                        onSelectionChange={(keys) => {
                          const val = Array.from(keys)[0] as string | undefined;
                          field.onChange(val);
                          setDisable(false);
                        }}
                        fullWidth
                      >
                        {(category: ICategory) => (
                          <SelectItem key={category._id}>{category.name}</SelectItem>
                        )}
                      </Select>
                    )}
                  />
                  <p className={`text-red-500 text-sm font-medium ${errors.category ? "visible" : "invisible"}`}>
                    {errors.category?.message || "خطا"}
                  </p>
                </div>

                <div className="w-1/2">
                  <Controller
                    name="subcategory"
                    control={control}
                    render={({ field }) => (
                      <Select
                        size="lg"
                        items={subcategories}
                        placeholder="زیر دسته‌بندی‌ها"
                        selectedKeys={field.value ? new Set([field.value]) : new Set()}
                        onSelectionChange={(keys) => {
                          const val = Array.from(keys)[0] as string | undefined;
                          field.onChange(val);
                          setDisable(false);
                        }}
                        fullWidth
                      >
                        {(subcategory: ISubcategory) => (
                          <SelectItem key={subcategory._id}>{subcategory.name}</SelectItem>
                        )}
                      </Select>
                    )}
                  />
                  <p className={`text-red-500 text-sm font-semibold ${errors.subcategory ? "visible" : "invisible"}`}>
                    {errors.subcategory?.message || "خطا"}
                  </p>
                </div>
              </div>

              <div className="w-full">
                <Textarea
                  fullWidth
                  label="توضیحات محصول"
                  {...register("description", { onChange: () => setDisable(false) })}
                />
                <p className={`text-red-500 text-sm font-semibold ${errors.description ? "visible" : "invisible"}`}>
                  {errors.description?.message || "خطا"}
                </p>
              </div>

              <div className="w-full flex items-center justify-center gap-4 mt-4">
                <Button color="default" variant="light" onClick={onClose} className="font-semibold">
                  لغو
                </Button>
                <Button isDisabled={disable || isPending} color="danger" type="submit" className="font-semibold">
                  {isPending ? "در حال ارسال..." : "ثبت"}
                </Button>
              </div>
            </form>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
