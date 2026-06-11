import { getCategoryById } from "@/app/apis/category.api";
import { getSubcategoryById } from "@/app/apis/subcategory.api";
import SubCategoryCard from "@/components/card-components/subcategory-card";
import { useQuery } from "@tanstack/react-query";
const SubcategorySection = ({
  categoryId,
  subcategoryId,
}: {
  categoryId: string;
  subcategoryId: string;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categoryName"],
    queryFn: () => getCategoryById(categoryId),
  });

  const categoryName = data?.data?.data?.category?.name;

  const {
    data: subData,
    isLoading: isLoadingSub,
    isError: isErrorSub,
  } = useQuery({
    queryKey: ["subcategoryName"],
    queryFn: () => getSubcategoryById(subcategoryId),
  });

  const subcategoryName = subData?.data?.data?.subcategory?.name;

  if (isLoading || isLoadingSub) return <p>در حال بارگذاری...</p>;
  if (isError || isErrorSub) return <p>خطا در دریافت کالاها</p>;
  return (
    <div className="flex flex-col gap-8 items-center">
      <h3 className="text-2xl font-bold">
        {categoryName}/{subcategoryName}
      </h3>
      <SubCategoryCard categoryId={categoryId} />
    </div>
  );
};

export default SubcategorySection;
