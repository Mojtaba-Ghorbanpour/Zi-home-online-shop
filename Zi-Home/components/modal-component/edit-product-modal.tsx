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
import { EditProductSchema } from "@/validation/product-validation";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { allCategories } from "@/app/apis/category.api";
import { getSubcategoryByCategory } from "@/app/apis/subcategory.api";
import { updateProducts } from "@/app/apis/product.api";

type ProductFormData = z.infer<typeof EditProductSchema>;

const EditProductModal: React.FC<IEditProductModalProps> = ({
  productName,
  category,
  subcategory,
  brand,
  price,
  quantity,
  id,
  description,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading: isLoadingCategory,
    isError: isErrorCategory,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: allCategories,
  });

  const categories = data?.data?.data?.categories || [];

  const {
    data: subCat,
    isLoading: isLoadingSubcategory,
    isError: isErrorSubcategory,
  } = useQuery({
    queryKey: ["subcategories", category],
    queryFn: () => getSubcategoryByCategory(`${category}`),
  });

  const subcategories = subCat?.data?.data?.subcategories || [];

  const [disable, setDisable] = React.useState(true);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(EditProductSchema),
    mode: "onSubmit",
    defaultValues: {
      name: productName,
      category,
      subcategory,
      thumbnail: undefined,
      brand,
      price,
      quantity,
      description,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => updateProducts(id, formData),
    onSuccess: () => {
      addToast({
        title: `محصول "${productName}" با موفقیت بروزرسانی شد`,
        color: "success",
        timeout: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
      reset();
    },
    onError: () => {
      addToast({
        title: `خطا در بروزرسانی محصول`,
        color: "danger",
        timeout: 3000,
      });
    },
  });
  const onSubmit = (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("price", String(data.price));
    formData.append("quantity", String(data.quantity));
    formData.append("category", data.category);
    formData.append("subcategory", data.subcategory);
    formData.append("description", data.description);

    if (data.thumbnail && data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }

    mutate(formData);
  };

  if (isLoadingCategory || isLoadingSubcategory)
    return <p>در حال بارگذاری...</p>;
  if (isErrorCategory || isErrorSubcategory)
    return <p>خطا در دریافت داده‌ها</p>;

  return (
    <Modal
      backdrop="opaque"
      classNames={{
        backdrop:
          "bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
      isOpen={true}
      onOpenChange={onClose}
      size="md"
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 items-center text-lg">
            ویرایش محصول
          </ModalHeader>
          <ModalBody>
            <form
              id="edit-product-form"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Input
                  label="تصویر کالا"
                  accept=".png, .jpg, .jpeg"
                  type="file"
                  {...register("thumbnail", {
                    onChange: () => setDisable(false),
                  })}
                  size="md"
                />
                <p
                  className={`text-red-500 text-sm ${
                    errors.thumbnail ? "visible" : "invisible"
                  }`}
                >
                  {(errors.thumbnail?.message as string) || "خطا"}
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
                  <p
                    className={`text-red-500 text-sm ${
                      errors.name ? "visible" : "invisible"
                    }`}
                  >
                    {errors.name?.message || "خطا"}
                  </p>
                </div>
                <div className="w-1/2">
                  <Input
                    label="برند"
                    type="text"
                    {...register("brand", {
                      onChange: () => setDisable(false),
                    })}
                    size="md"
                  />
                  <p
                    className={`text-red-500 text-sm ${
                      errors.brand ? "visible" : "invisible"
                    }`}
                  >
                    {errors.brand?.message || "خطا"}
                  </p>
                </div>
              </div>

              <div className="w-full flex gap-5">
                <div className="w-1/2">
                  <Input
                    label="قیمت"
                    type="number"
                    {...register("price", {
                      valueAsNumber: true,
                      onChange: () => setDisable(false),
                    })}
                    size="md"
                  />
                  <p
                    className={`text-red-500 text-sm ${
                      errors.price ? "visible" : "invisible"
                    }`}
                  >
                    {errors.price?.message || "خطا"}
                  </p>
                </div>
                <div className="w-1/2">
                  <Input
                    label="تعداد"
                    type="number"
                    {...register("quantity", {
                      valueAsNumber: true,
                      onChange: () => setDisable(false),
                    })}
                    size="md"
                  />
                  <p
                    className={`text-red-500 text-sm ${
                      errors.quantity ? "visible" : "invisible"
                    }`}
                  >
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
                        isDisabled
                        selectedKeys={field.value ? [field.value] : []}
                        items={categories}
                        size="md"
                      >
                        {(cat: ICategory) => (
                          <SelectItem key={cat._id}>{cat.name}</SelectItem>
                        )}
                      </Select>
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <Controller
                    name="subcategory"
                    control={control}
                    render={({ field }) => (
                      <Select
                        selectedKeys={field.value ? [field.value] : []}
                        onSelectionChange={(keys) => {
                          const selectedKey = Array.from(keys)[0];
                          field.onChange(selectedKey);
                          setDisable(false);
                        }}
                        items={subcategories}
                        size="md"
                      >
                        {(sub: ISubcategory) => (
                          <SelectItem key={sub._id}>{sub.name}</SelectItem>
                        )}
                      </Select>
                    )}
                  />
                  <p
                    className={`text-red-500 text-sm ${
                      errors.subcategory ? "visible" : "invisible"
                    }`}
                  >
                    {errors.subcategory?.message}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <Textarea
                  fullWidth
                  label="توضیحات محصول"
                  {...register("description", {
                    onChange: () => setDisable(false),
                  })}
                />
                <p
                  className={`text-red-500 text-sm font-semibold ${
                    errors.description ? "visible" : "invisible"
                  }`}
                >
                  {errors.description?.message || "خطا"}
                </p>
              </div>
              <div className="w-full flex items-center justify-center gap-4 mt-4">
                <Button
                  color="default"
                  variant="light"
                  onClick={onClose}
                  className="font-semibold"
                >
                  لغو
                </Button>
                <Button
                  isDisabled={disable || isPending}
                  color="danger"
                  type="submit"
                  className="font-semibold"
                >
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

export default EditProductModal;
