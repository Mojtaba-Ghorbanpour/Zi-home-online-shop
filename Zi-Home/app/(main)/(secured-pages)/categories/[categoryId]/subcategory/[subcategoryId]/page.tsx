import { getCategoriesProduct } from "@/app/apis/product.api";
import SubCategoryProductList from "@/components/list-components/subcategory-product-list";

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string; subcategoryId: string }>;
}) {

  const { categoryId, subcategoryId } = await params;

  const response = await getCategoriesProduct(categoryId, 1, 20);
  const products = response?.data?.products ?? [];

  return (
    <section className="p-4">
      <SubCategoryProductList
        products={products}
        subcategoryId={subcategoryId}
      />
    </section>
  );
}