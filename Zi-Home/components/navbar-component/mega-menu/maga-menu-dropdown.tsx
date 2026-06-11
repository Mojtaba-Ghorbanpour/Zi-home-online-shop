import { allCategories } from "@/app/apis/category.api";
import { DropdownItem, DropdownMenu } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const MegaMenuDropdown = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["MenuCategories"],
    queryFn: () => allCategories(),
  });

  const MenuCategories = (data?.data?.data?.categories || []).map(
    (c: ICategory) => ({
      id: c._id,
      name: c.name,
    })
  );
  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت کالاها</p>;
  return (
    <DropdownMenu className="flex flex-col w-96">
      {MenuCategories.map((category: ICategory) => (
        <DropdownItem
          key={category.id as string}
          as={Link}
          href={`/categories/${category.id}`}
          classNames={{
            base: "text-base my-2",
            title: "font-semibold",
          }}
        >
          {category.name}
        </DropdownItem>
      ))}
    </DropdownMenu>
  );
};
export default MegaMenuDropdown;
