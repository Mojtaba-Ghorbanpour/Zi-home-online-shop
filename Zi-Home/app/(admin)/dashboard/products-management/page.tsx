"use client";
import ProductsTable from "@/components/table-components/product-table/product-table";
import React from "react";

const ProductPage = () => {
  return (
    <section>
      <h3 className="text-xl font-semibold ">مدیریت کالا ها</h3>
      <ProductsTable />
    </section>
  );
};
export default ProductPage;
