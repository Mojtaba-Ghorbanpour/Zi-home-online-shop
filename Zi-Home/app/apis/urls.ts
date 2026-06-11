export const baseURL = "http://localhost:8000";

export const urls = {
  auth: {
    login: `${baseURL}/api/auth/login`,
    signup: `${baseURL}/api/auth/signup`,
    logout: `${baseURL}/api/auth/logout`,
    token: `${baseURL}/api/auth/token`,
  },
  categories: `${baseURL}/api/categories`,
  orders: `${baseURL}/api/orders`,
  products: `${baseURL}/api/products`,
  subcategories: `${baseURL}/api/subcategories`,
  users: `${baseURL}/api/users`,
};
