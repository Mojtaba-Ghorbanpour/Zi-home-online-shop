import { getSubcategoryById } from "@/app/apis/subcategory.api";
import { useQuery } from "@tanstack/react-query";

const GetSubcategoryName = ({ subcategoryId }: { subcategoryId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subcategoryName"],
    queryFn: () => getSubcategoryById(subcategoryId),
  });

  const subcategory = data?.data?.data?.subcategory.name || [];

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت زیر دسته بندی ها</p>;
  return subcategory;
};
export default GetSubcategoryName;
