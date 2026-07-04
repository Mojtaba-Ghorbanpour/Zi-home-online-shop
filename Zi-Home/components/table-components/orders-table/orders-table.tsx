// components/table-components/orders-table/orders-table.tsx

"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import RenderOrderTableCell from "./render-orders-table-cell";
import { allOrders, type IOrder } from "@/app/apis/order.api";
import TablePagination from "../table-pagination/table-pagination";

type TStatusFilter = "all" | "true" | "false";
type TOrderRow = {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  deliveryDate: Date;
  products: IOrder["products"];
  deliveryStatus: boolean;
};
export const columns = [
  { name: "شناسه سفارش", uid: "id" },
  { name: "نام کاربر", uid: "name" },
  { name: "مجموع مبلغ", uid: "price", sortable: true },
  { name: "زمان ثبت سفارش", uid: "date", sortable: true },
  { name: "وضعیت سفارش", uid: "status" },
  { name: "جزئیات", uid: "details" },
];

const OrdersTable = () => {
  const [statusFilter, setStatusFilter] = React.useState<TStatusFilter>("all");
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", page, statusFilter],
    queryFn: () => allOrders(page, 5, statusFilter),
  });

  const orders: TOrderRow[] = (data?.data?.data?.orders || []).map(
    (order: IOrder) => ({
      id: order._id,
      name: order.user,
      price: order.totalPrice,
      createdAt: new Date(order.createdAt || "").toLocaleDateString("fa-IR"),
      deliveryDate: new Date(order.deliveryDate || "").toLocaleDateString(
        "fa-IR",
      ),
      products: order.products,
      deliveryStatus: order.deliveryStatus,
    }),
  );

  const totalPages = data?.data?.total_pages || 0;
  console.log("✅ response data", data);
  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت سفارشات</p>;

  return (
    <div className="flex flex-col gap-4 py-5">
      <div className="flex gap-3 items-end">
        <RadioGroup
          orientation="horizontal"
          color="danger"
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value as TStatusFilter);
            setPage(1);
          }}
        >
          <Radio value="all">همه</Radio>
          <Radio value="true">ارسال شده</Radio>
          <Radio value="false">در انتظار ارسال</Radio>
        </RadioGroup>
      </div>

      <Table selectionMode="single">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "details" ? "center" : "start"}
              allowsSorting={column.sortable}
              className={`font-semibold text-base text-danger-500 ${
                column.uid === "details" ? "w-1/12" : ""
              }`}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"سفارشی یافت نشد!"} items={orders}>
          {(item: TOrderRow) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="font-semibold text-natural-800">
                  <RenderOrderTableCell
                    order={item}
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

export default OrdersTable;
