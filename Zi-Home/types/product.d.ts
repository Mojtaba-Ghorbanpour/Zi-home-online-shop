interface IAddProductData {
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity?: number;
  brand: string;
  description: string;
  thumbnail?: string;
  images?: Array<string>;
}

interface IUpdateProductData {
  category?: string;
  subcategory?: string;
  name?: string;
  price?: number;
  quantity?: number;
  brand?: string;
  description?: string;
  thumbnail?: string;
  images?: Array<string>;
}

interface IProduct {
  id?: string;
  _id?: string;
  name?: string;
  brand: string;
  thumbnail: string;
  category: string;
  subcategory: string;
  thumbnail: string;
  price?: number;
  quantity?: number;
  description?: string;
}

interface SortDescriptor {
  column: SortColumn;
  direction: "ascending" | "descending";
}

interface IEditProductModalProps {
  productName: string;
  category: string;
  subcategory: string;
  thumbnail: string;
  brand: string;
  price: number;
  quantity: number;
  id: string;
  description: string;
  onClose: () => void;
}

interface IDeleteProductModalProps {
  id: string;
  productName: string;
  onClose: () => void;
}

interface IProductByCategory {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  brand: string;
  thumbnail: string;
}

interface IUserOrderProduct {
  _id: string;
  count: number;
  product: string;
}

interface IEditableProduct {
  price?: number;
  quantity?: number;
}
