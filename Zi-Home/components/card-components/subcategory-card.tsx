"use client";
import { getSubcategoryByCategory } from "@/app/apis/subcategory.api";
import { Card, CardBody } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
const SubCategoryCard = ({ categoryId }: { categoryId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getSubcategoryByCategory(categoryId),
  });

  const footerSubCategory = (data?.data?.data?.subcategories || []).map(
    (sub: ISubcategory) => ({
      id: sub._id,
      name: sub.name,
    })
  );

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت کالاها</p>;

  return (
    <div className="gap-6 flex w-full">
      {footerSubCategory.map((subcategory: IProductByCategory) => (
        <Link
          key={subcategory.id}
          href={`/categories/${categoryId}/subcategory/${subcategory.id}`}
        >
          <Card isPressable shadow="md" className="size-full">
            <CardBody className="flex gap-2 hover:text-danger-500">
              <p className="text-center font-medium line-clamp-1">
                {subcategory.name}
              </p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SubCategoryCard;
