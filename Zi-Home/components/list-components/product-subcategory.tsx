import { getSubcategoryByCategory } from "@/app/apis/subcategory.api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const ProductSubcategory = ({ categoryId }: { categoryId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["footerSubCategory", categoryId],
    queryFn: () => getSubcategoryByCategory(categoryId),
  });

  const footerSubCategory = (data?.data?.data?.subcategories || []).map(
    (sub: ISubcategory) => ({
      id: sub._id,
      name: sub.name,
    })
  );
  console.log(footerSubCategory);
  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت کالاها</p>;

  return (
    <div className="flex flex-col gap-4 w-full">
      {footerSubCategory.map((subcategory: IProductByCategory) => (
        <Link
          key={subcategory.id}
          href={`/categories/${categoryId}/subcategory/${subcategory.id}`}
          className="hover:text-danger-500"
        >
          {subcategory.name}
        </Link>
      ))}
    </div>
  );
};
export default ProductSubcategory;
