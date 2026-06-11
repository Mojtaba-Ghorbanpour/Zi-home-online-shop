"use client";
import { allCategories } from "@/app/apis/category.api";
import { Tabs, Tab, Divider } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import CategoryContent from "./best-selling-category-content";
import Link from "next/link";

const BestSellingTab = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => allCategories(),
  });

  const categories = (data?.data?.data?.categories || []).map(
    (c: ICategory) => ({
      id: c._id,
      name: c.name,
    })
  );
  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت کالاها</p>;

  return (
    <>
      <div className="flex items-center gap-3 font-semibold">
        <h3 className="shrink-0 text-danger-500">پرفروش ترین محصولات</h3>
        <div className="w-full font-bold">
          <Divider orientation="horizontal" />
        </div>
        <Link className="shrink-0 text-natural-800 text-sm" href={"/hot"}>
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
              <CategoryContent categoryId={category.id} />
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default BestSellingTab;
