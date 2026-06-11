"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  addToast,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { allProducts, updateProducts } from "@/app/apis/product.api";
import TableSearch from "@/components/search-components/table-search";
import TablePagination from "../table-pagination/table-pagination";
import { useDebounce } from "use-debounce";
import RenderInventoryTableCell from "./render-inventory-table-cell";

export const columns = [
  { name: "کالا", uid: "product" },
  { name: "قیمت", uid: "price" },
  { name: "موجودی", uid: "quantity" },
];

const InventoryTable = () => {
  const [sortProducts, setSortProducts] = React.useState<TPriceSort>(null);
  const [filterValue, setFilterValue] = React.useState("");
  const [debouncedFilter] = useDebounce(filterValue, 1000);
  const [page, setPage] = React.useState(1);

  const [editableCells, setEditableCells] = React.useState<{
    [productId: string]: IEditableProduct;
  }>({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", page, debouncedFilter, sortProducts],
    queryFn: () => allProducts(page, 5, debouncedFilter, sortProducts),
  });

  const products = (data?.data?.data?.products || []).map(
    (product: IProduct) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    })
  );

  const totalPages = data?.data?.total_pages || 0;

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت کالاها</p>;

  const handleSaveAll = async () => {
    const requests = Object.entries(editableCells).map(
      ([productId, values]) => {
        const formData = new FormData();
        if (values.price !== undefined)
          formData.append("price", String(values.price));
        if (values.quantity !== undefined)
          formData.append("quantity", String(values.quantity));

        return updateProducts(productId, formData);
      }
    );
    try {
      const results = await Promise.all(requests);
      console.log(results);
      addToast({
        title: `محصول با موفقیت بروزرسانی شد`,
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-5">
      <div className="flex justify-between gap-3 items-end">
        <TableSearch
          value={filterValue}
          onChange={setFilterValue}
          onClear={() => setFilterValue("")}
        />
        <div className="flex gap-3">
          <Button
            color="danger"
            variant="ghost"
            isDisabled={Object.keys(editableCells).length === 0}
            className="font-semibold"
            onClick={handleSaveAll}
          >
            ذخیره
          </Button>
        </div>
      </div>

      <Table
        selectionMode="single"
        onSortChange={(sortPrice) => {
          if (sortPrice.column === "price") {
            const newSort = sortProducts === "price" ? "-price" : "price";
            setSortProducts(newSort);
            setPage(1);
          }
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.uid === "price"}
              className={`font-semibold text-base text-danger-500 ${
                column.uid === "product" ? "w-8/12" : ""
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
                  <RenderInventoryTableCell
                    product={item}
                    columnKey={columnKey as string}
                    editableCells={editableCells}
                    setEditableCells={setEditableCells}
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

export default InventoryTable;
