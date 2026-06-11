import OrderAction from "@/components/modal-component/action-components/order-action";
import GetUserName from "./get-username";

const RenderOrderTableCell = ({
  order,
  columnKey,
}: {
  order: IOrder;
  columnKey: string;
}) => {
  switch (columnKey) {
    case "id":
      return order.id;
    case "name":
      return <GetUserName userId={order.name as string} />;
    case "price": {
      return new Intl.NumberFormat("fa-IR").format(order.price as number);
    }
    case "date": {
      return order.createdAt;
    }
    case "status":
      return order.deliveryStatus ? "ارسال شده" : "در انتظار ارسال";
    case "details":
      return <OrderAction order={order} />;
  }
};

export default RenderOrderTableCell;
