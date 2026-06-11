"use client";
import { allCategories } from "@/app/apis/category.api";
import { Tabs, Tab, Divider } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import MostPopularCategoryContent from "./category-content";
import Link from "next/link";

const MostPopularTab = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => allCategories(),
  });

  const categories = (data?.data?.data?.categories || [])
    .filter((c: ICategory) => c._id !== "6899c10d140d101bd2968f85")
    .map((c: ICategory) => ({
      id: c._id,
      name: c.name,
    }));

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت کالاها</p>;

  return (
    <>
      <div className="flex items-center gap-3 font-semibold">
        <h3 className="shrink-0 text-danger-500">محبوب ترین محصولات</h3>
        <div className="w-full font-bold">
          <Divider orientation="horizontal" />
        </div>
        <Link className="shrink-0 text-natural-800 text-sm" href={"/popular"}>
          مشاهده همه
        </Link>
      </div>
      <div className="flex w-full flex-col">
        <Tabs
          items={categories}
          variant="underlined"
          color="danger"
          className="font-semibold text-natural-900"
        >
          {(category: ICategory) => (
            <Tab key={category._id} title={category.name}>
              <MostPopularCategoryContent categoryId={category.id as string} />
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default MostPopularTab;
