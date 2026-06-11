"use client";
import { allCategories } from "@/app/apis/category.api";
import { Card, CardBody } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
const CategoryCard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => allCategories(),
  });

  const categories = (data?.data?.data?.categories || []).map(
    (c: ICategory) => ({
      id: c._id,
      name: c.name,
      icon: c.icon,
    })
  );

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت کالاها</p>;

  return (
    <div className="sm:gap-2 lg:gap-6 grid grid-cols-2 gap-4 sm:grid-cols-4 w-full">
      {categories.map((category: ICategory) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <Card isPressable shadow="md" className="size-full">
            <CardBody className="flex gap-2 hover:text-danger-500">
              <p className="text-center text-lg">{category.name}</p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCard;
