// ✅ فایل کامل: app/apis/order.api.ts

import { generateHttpClient } from "./client";
import { urls } from "./urls";

export interface IOrder {
  _id: string;
  user: string;
  products: { product: string; count: number }[];
  deliveryDate?: string;
  deliveryStatus?: boolean;
  status?: string;
  totalPrice?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export async function testConnection(): Promise<boolean> {
  try {
    const res = await generateHttpClient().get(urls.orders + "?page=1&limit=1");
    return res.status === 200 || res.status === 201;
  } catch (err) {
    console.error("❌ testConnection error", err);
    return false;
  }
}

export async function getOrderByIdSafe(
  id: string,
): Promise<{ order: IOrder; success: boolean }> {
  const url = `${urls.orders}/${id}`;
  const res = await generateHttpClient().get(url);
  return { order: res.data?.order || res.data?.data, success: true };
}

export async function allOrders(
  page: number = 1,
  limit: number = 10,
  deliveryStatus: "true" | "false" | "all" = "all",
) {
  const query = new URLSearchParams();
  query.append("page", page.toString());
  query.append("limit", limit.toString());
  if (deliveryStatus !== "all") {
    query.append("deliveryStatus", deliveryStatus);
  }

  const url = `${urls.orders}?${query.toString()}`;
  const res = await generateHttpClient().get(url);
  return res;
}

export async function updateOrder(orderId: string, payload: Partial<IOrder>) {
  const url = `${urls.orders}/${orderId}`;
  const res = await generateHttpClient().patch(url, payload);
  return res.data;
}
