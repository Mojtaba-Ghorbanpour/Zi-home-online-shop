import { generateHttpClient } from "./client";
import { urls } from "./urls";

export async function allCategories() {
  const response = await generateHttpClient().get(urls.categories);
  return response;
}

export async function addCategory(data: IAddCategory) {
  const response = await generateHttpClient().post(urls.subcategories, data);
  return response;
}

export async function getCategoryById(id: string) {
  const response = await generateHttpClient().get(`${urls.categories}/${id}`);

  return response;
}

export async function updateCategory(id: string, body: IUpdateCategory) {
  const response = await generateHttpClient().patch(
    `${urls.categories}/${id}`,
    body
  );
  return response;
}

export function deleteCategory(id: string) {
  const response = generateHttpClient().delete(`${urls.categories}/${id}`);
  return response;
}
