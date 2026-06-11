"use client";

import { getProductById } from "@/app/apis/product.api";
import { BackArrowIcon, CheckIcon } from "@/public/svgs/icons";
import {
  addToast,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import CounterBox from "../counter-box-component/counter-box";
import React from "react";
import Link from "next/link";

// تعریف نوع IProduct
interface IProduct {
  _id: string;
  name: string;
  price: number;
  brand: string;
  quantity: number;
  thumbnail: string;
  category: { _id: string; name: string };
  subcategory: { name: string };
}

// تعریف نوع آیتم سبد خرید
interface CartItem {
  product: string;
  name: string;
  count: number;
  price: number;
  thumbnail: string;
}

const SingleProduct = ({ productId }: { productId: string }) => {
  const [count, setCount] = React.useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singleProduct", productId],
    queryFn: () => getProductById(productId),
  });

  const product: IProduct | undefined = data?.data?.data?.product;

  // مدیریت حالات loading و error
  if (isLoading) return <p className="text-center">در حال بارگذاری...</p>;
  if (isError || !product)
    return <p className="text-center text-danger-500">خطا در دریافت کالاها</p>;

  const totalPrice = Number(product.price) * count;

  const handleSubmit = () => {
    // بررسی موجودی
    if (count > product.quantity) {
      addToast({
        title: "موجودی کافی نیست!",
        color: "danger",
        icon: <CheckIcon />,
        timeout: 3000,
      });
      return;
    }

    const cartItemsRaw = localStorage.getItem("cartItems");
    const cartItems: CartItem[] = cartItemsRaw ? JSON.parse(cartItemsRaw) : [];

    const existingIndex = cartItems.findIndex(
      (item) => item.product === product._id
    );

    if (existingIndex !== -1) {
      cartItems[existingIndex].count += count;
    } else {
      cartItems.push({
        product: product._id,
        name: product.name,
        count,
        price: Number(product.price),
        thumbnail: product.thumbnail,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    addToast({
      title: `${product.name} با موفقیت به سبد خرید اضافه شد`,
      color: "success",
      icon: <CheckIcon />,
      timeout: 3000,
    });
  };

  return (
    <section className="flex flex-col px-5 gap-10">
      <div>
        <Link href={`/categories/${product.category._id}`}>
          <BackArrowIcon />
        </Link>
      </div>
      <Breadcrumbs>
        <BreadcrumbItem>زی هوم</BreadcrumbItem>
        <BreadcrumbItem>{product.category.name}</BreadcrumbItem>
        <BreadcrumbItem>{product.subcategory.name}</BreadcrumbItem>
        <BreadcrumbItem>{product.name}</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex justify-between">
        <div className="flex bg-neutral-50/5 py-10 px-20 w-fit rounded-2xl gap-5 border border-neutral-200">
          <Image
            alt={`${product.name} image`}
            src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
            width={500}
            height={500}
            className="object-cover"
          />
          <div className="space-y-4 font-medium">
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-neutral-400 font-normal">{product.brand}</p>
            <p>
              در دسته‌بندی: {product.category.name} / {product.subcategory.name}
            </p>
            <p>تعداد باقی‌مانده: {product.quantity} عدد</p>
            <p className="text-danger-500 font-medium">
              بیش از ۹۰٪ مشتریان از خرید این محصول راضی بوده‌اند!
            </p>
            <p>
              قیمت:{" "}
              <span className="text-danger-500">
                {new Intl.NumberFormat("fa-IR").format(product.price)} تومان
              </span>
            </p>
          </div>
        </div>

        <div className="w-3/12 bg-neutral-50/5 rounded-2xl border border-neutral-100 flex flex-col justify-between">
          <div className="flex flex-col gap-5 py-5 px-4">
            <p>برند محصول: {product.brand}</p>
            <Divider orientation="horizontal" />
            <p>گارانتی اصالت کالا</p>
            <Divider orientation="horizontal" />
            <p>تضمین کیفیت</p>
            <Divider orientation="horizontal" />
            <div className="flex justify-between items-center">
              <CounterBox count={count} onChange={setCount} />
              <p className="text-end text-lg font-semibold">
                {new Intl.NumberFormat("fa-IR").format(totalPrice)} تومان
              </p>
            </div>
          </div>
          <Button
            color="danger"
            variant="solid"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;