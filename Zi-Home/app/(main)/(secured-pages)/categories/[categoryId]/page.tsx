import { getCategoriesProduct } from "@/app/apis/product.api";
import CategoryProductList from "@/components/list-components/category-product-list";

export const dynamic = "force-dynamic"; // 👈 جلوگیری از خطاهای cache و build

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const categoryId = params.categoryId;

  // گرفتن محصولات دسته‌بندی
  const response = await getCategoriesProduct(categoryId, 1, 20);
  const products = response.data?.products ?? [];

  return (
    <section className="p-4">
      <CategoryProductList products={products} />
    </section>
  );
}
