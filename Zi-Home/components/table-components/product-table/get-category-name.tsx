import { getCategoryById } from "@/app/apis/category.api";
import { useQuery } from "@tanstack/react-query";

const GetCategoryName = ({ categoryId }: { categoryId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categoryName"],
    queryFn: () => getCategoryById(categoryId),
  });

  const category = data?.data?.data?.category.name || [];

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت دسته بندی ها</p>;
  return category;
};
export default GetCategoryName;
