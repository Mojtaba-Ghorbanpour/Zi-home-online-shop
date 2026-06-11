import axios from "axios";
import { baseURL } from "./urls";
import { tokenName } from "./auth-token";

export function generateHttpClient() {
  const instance = axios.create({
    baseURL: baseURL,
  });

  instance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(tokenName);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  return instance;
}
