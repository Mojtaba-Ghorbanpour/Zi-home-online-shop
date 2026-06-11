"use client";

import SingleProduct from "@/components/single-product-component/single-product";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const productId = params?.productId as string;

  return (
    <section className="p-4">
      <SingleProduct productId={productId} />
    </section>
  );
}
