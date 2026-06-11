import GetProductName from "./get-order-product";

const RenderPersonOrderTableCell = ({
  product,
  columnKey,
}: {
  product: IUserOrderProduct;
  columnKey: string;
}) => {
  switch (columnKey) {
    case "id":
      return product._id;
    case "product":
      return <GetProductName productId={product.product as string} />;
    case "count":
      return product.count;
  }
};

export default RenderPersonOrderTableCell;
