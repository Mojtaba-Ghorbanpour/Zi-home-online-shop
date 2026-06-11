import { getProductById } from "@/app/apis/product.api";
import { useQuery } from "@tanstack/react-query";

const GetProductName = ({ productId }: { productId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productName", productId],
    queryFn: () => getProductById(productId),
  });

  const productName = data?.data?.data?.product.name || [];

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت نام محصول</p>;

  return productName;
};
export default GetProductName;
