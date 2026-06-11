"use client";
import { useQuery } from "@tanstack/react-query";
import { allCategories } from "@/app/apis/category.api";
import FooterSubcategories from "./footer-subcategories";
import Link from "next/link";

const FooterCategories = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["footerCategories"],
    queryFn: () => allCategories(),
  });

  const categories = (data?.data?.data?.categories || []).map(
    (c: ICategory) => ({
      id: c._id,
      name: c.name,
    })
  );

  if (isLoading) {
    return <p>در حال بارگذاری...</p>;
  }
  if (isError) {
    return <p>خطا در دریافت دسته‌بندی‌ها</p>;
  }

  return (
    <div className="flex gap-7 w-fit h-full">
      {categories?.map((category: ICategory) => (
        <div key={category.id} className="space-y-4">
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="font-bold hover:text-danger-500"
          >
            {category.name}
          </Link>
          <div className="w-full flex justify-between gap-3 mt-4">
            <FooterSubcategories categoryId={category.id as string} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterCategories;
