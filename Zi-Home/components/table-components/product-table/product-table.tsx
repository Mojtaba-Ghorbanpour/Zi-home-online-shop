"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { allProducts } from "@/app/apis/product.api";
import RenderProductTableCell from "./render-product-table-cell";
import AddProductAction from "@/components/modal-component/action-components/add-product-action";
import { useDebounce } from "use-debounce";
import TableSearch from "@/components/search-components/table-search";
import TablePagination from "../table-pagination/table-pagination";

export const columns = [
  { name: "ID", uid: "id" },
  { name: "کالا", uid: "name" },
  { name: "دسته بندی", uid: "category" },
  { name: "زیر دسته بندی", uid: "subcategory" },
  { name: "ACTIONS", uid: "actions" },
];

const ProductsTable = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [debouncedFilter] = useDebounce(filterValue, 1000);
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, debouncedFilter],
    queryFn: () => allProducts(page, 5, debouncedFilter),
  });

  const products = (data?.data?.data?.products || []).map((p: IProduct) => ({
    id: p._id,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    thumbnail: p.thumbnail,
    price: p.price,
    quantity: p.quantity,
    brand: p.brand,
    description: p.description,
  }));

  const totalPages = data?.data?.total_pages || 0;

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت کالاها</p>;
  return (
    <div className="flex flex-col gap-4 py-5">
      <div className="flex justify-between gap-3 items-end">
        <TableSearch
          value={filterValue}
          onChange={(val) => setFilterValue(val)}
          onClear={() => setFilterValue("")}
        />
        <div className="flex gap-3">
          <AddProductAction />
        </div>
      </div>

      <Table selectionMode="single">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className={`font-semibold text-base text-danger-500 ${
                column.uid === "actions" ? "w-1/12" : ""
              }`}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"محصول مورد نظر یافت نشد!"} items={products}>
          {(item: IProduct) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="font-semibold text-natural-800">
                  <RenderProductTableCell
                    product={item}
                    columnKey={columnKey as string}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div>
        <TablePagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
