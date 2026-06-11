interface IOrder {
  _id?: string;
  id?: string;
  user: string;
  products: Array<{ product: string; count: number }>;
  deliveryDate: Date;
  price?: number;
  totalPrice?: number;
  name?: string;
  createdAt: string;
  deliveryStatus: boolean;
}

interface IUpdateOrder {
  deliveryStatus?: boolean;
  deliveryDate?: Date;
}

interface IInfo extends IOrder {
  onClose: () => void;
}

interface IUpdateOrderData {
  deliveryStatus: string;
  deliveryDate: Date;
}

type TStatusFilter = "all" | "true" | "false";

type TPriceSort = "price" | "-price" | null;
