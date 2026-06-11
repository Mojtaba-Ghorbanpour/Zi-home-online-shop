interface IDeleteCartItemProps {
  itemName: string;
  onDelete: (itemName: string) => void;
  itemId: string;
}

interface ICartItem {
  product: string;
  name: string;
  count: number;
  price: number;
  thumbnail: string;
}
