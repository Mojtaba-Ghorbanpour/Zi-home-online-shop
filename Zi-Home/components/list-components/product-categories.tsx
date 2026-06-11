import { allCategories } from "@/app/apis/category.api";
import { Accordion, AccordionItem } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import ProductSubcategory from "./product-subcategory";

const ProductCategory = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["footerCategories"],
    queryFn: () => allCategories(),
  });
  const categories = (data?.data?.data?.categories || []).map(
    (c: ICategory) => ({
      id: c._id,
      name: c.name,
    })
  );

  if (isLoading) {
    return <p>در حال بارگذاری...</p>;
  }
  if (isError) {
    return <p>خطا در دریافت دسته‌بندی‌ها</p>;
  }
  return (
    <div>
      <Accordion variant="shadow">
        {categories?.map((category: ICategory) => (
          <AccordionItem title={category.name} key={category.id}>
            <ProductSubcategory categoryId={category.id as string} />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
export default ProductCategory;
