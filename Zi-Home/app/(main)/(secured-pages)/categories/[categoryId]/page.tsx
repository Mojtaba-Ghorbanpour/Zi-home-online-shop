import { getCategoriesProduct } from "@/app/apis/product.api";
import CategoryProductList from "@/components/list-components/category-product-list";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  const response = await getCategoriesProduct(categoryId, 1, 20);
  const products = response.data?.products ?? [];

  return (
    <section className="p-4">
      <CategoryProductList products={products} />
    </section>
  );
}
