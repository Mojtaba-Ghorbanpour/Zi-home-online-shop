import { generateHttpClient } from "./client";
import { urls } from "./urls";

export async function allProducts(
  page: number,
  limit: number,
  search?: string,
  sort?: TPriceSort
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search) params.append("search", search);
  if (sort) {
    params.append("sort", sort);
  }
  const response = await generateHttpClient().get(
    `${urls.products}?${params.toString()}`
  );
  return response;
}

export async function addProducts(data: FormData) {
  const response = await generateHttpClient().post(urls.products, data);
  return response;
}

export async function getProductById(id: string) {
  const response = await generateHttpClient().get(`${urls.products}/${id}`);
  return response;
}

export async function getProductByCategory(
  id: string,
  page: number,
  limit: number
) {
  const response = await generateHttpClient().get(
    `${urls.products}?page=${page}&limit=${limit}&category=${id}`
  );
  return response;
}

export async function updateProducts(id: string, data: FormData) {
  const response = await generateHttpClient().patch(
    `${urls.products}/${id}`,
    data
  );
  return response;
}

export async function deleteProduct(id: string) {
  const response = await generateHttpClient().delete(`${urls.products}/${id}`);

  return response;
}

export async function getCategoriesProduct(
  categoryId: string,
  page: number,
  limit: number
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    category: categoryId,
  });

  const response = await generateHttpClient().get(
    `${urls.products}?${params.toString()}`
  );

  return response.data;
}
