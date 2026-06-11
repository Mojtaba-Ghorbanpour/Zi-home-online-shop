import { generateHttpClient } from "./client";
import { urls } from "./urls";

export async function allUsers() {
  const response = await generateHttpClient().get(urls.users);
  return response;
}

export async function addUser(data: IAddProductData) {
  const response = await generateHttpClient().post(urls.users, data);
  return response;
}

export async function getUserById(id: string) {
  const response = await generateHttpClient().get(`${urls.users}/${id}`);
  return response;
}

export async function updateUser(id: string, data: IUpdateUser) {
  const response = await generateHttpClient().patch(
    `${urls.users}/${id}`,
    data
  );
  return response;
}

export async function deleteUser(id: string) {
  const response = await generateHttpClient().delete(`${urls.users}/${id}`);
  return response;
}
