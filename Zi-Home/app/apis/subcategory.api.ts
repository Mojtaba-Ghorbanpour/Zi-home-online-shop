import { generateHttpClient } from "./client";
import { urls } from "./urls";

export async function allSubcategories(page: number, limit: number) {
  const response = await generateHttpClient().get(
    `${urls.subcategories}?page=${page}&limit=${limit}`
  );
  return response;
}

export async function getSubcategoryByCategory(category: string) {
  const response = await generateHttpClient().get(urls.subcategories, {
    params: { category },
  });

  return response;
}

export async function addSubcategory(data: IAddSubcategory) {
  const response = await generateHttpClient().post(urls.subcategories, data);
  return response;
}

export async function getSubcategoryById(id: string) {
  const response = await generateHttpClient().get(
    `${urls.subcategories}/${id}`
  );

  return response;
}

export async function updateSubcategory(id: string, data: IUpdateSubcategory) {
  const response = await generateHttpClient().patch(
    `${urls.subcategories}/${id}`,
    data
  );
  return response;
}

export async function deleteSubcategory(id: string) {
  const response = await generateHttpClient().delete(
    `${urls.subcategories}/${id}`
  );
  return response;
}
