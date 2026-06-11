import { InfoIcon } from "@/public/svgs/icons";
import { Button } from "@heroui/react";
import React from "react";
import InfoModal from "../info-modal";

const OrderAction = ({ order }: { order: IOrder }) => {
  const [openInfo, setOpenInfo] = React.useState(false);

  return (
    <div className="relative flex justify-center items-center gap-2">
      <Button
        onClick={() => setOpenInfo(true)}
        isIconOnly
        variant="light"
        color="danger"
      >
        <InfoIcon />
      </Button>

      {openInfo && (
        <InfoModal
          user={order.name as string}
          createdAt={order.createdAt}
          totalPrice={order.price}
          products={order.products}
          deliveryDate={order.deliveryDate}
          deliveryStatus={order.deliveryStatus}
          onClose={() => setOpenInfo(false)}
          id={order.id}
        />
      )}
    </div>
  );
};

export default OrderAction;
