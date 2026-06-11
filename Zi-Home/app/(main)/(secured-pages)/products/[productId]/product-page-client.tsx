"use client";

import SingleProduct from "@/components/single-product-component/single-product";

export default function ProductPageClient({ productId }: { productId: string }) {
  return (
    <section className="p-4">
      <SingleProduct productId={productId} />
    </section>
  );
}
