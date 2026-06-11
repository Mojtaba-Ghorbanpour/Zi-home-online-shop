import { getCategoryById } from "@/app/apis/category.api";
import { getSubcategoryById } from "@/app/apis/subcategory.api";
import SubCategoryCard from "@/components/card-components/subcategory-card";
import { useQuery } from "@tanstack/react-query";
const CategoryHeaderSection = ({ categoryId }: { categoryId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categoryName"],
    queryFn: () => getCategoryById(categoryId),
  });

  const categoryName = data?.data?.data?.category?.name;

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت کالاها</p>;
  return (
    <div className="flex flex-col gap-8 items-center">
      <h3 className="text-2xl font-bold">دسته بندی {categoryName}</h3>
      <SubCategoryCard categoryId={categoryId} />
    </div>
  );
};

export default CategoryHeaderSection;
