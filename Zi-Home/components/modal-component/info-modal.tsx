import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  addToast,
} from "@heroui/react";
import GetUserName from "../table-components/orders-table/get-username";
import OrderProductsTable from "../table-components/orders-table/order-products-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "@/app/apis/order.api";
import React from "react";

const InfoModal: React.FC<IInfo> = ({
  products,
  user,
  createdAt,
  deliveryDate,
  totalPrice,
  deliveryStatus,
  id,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (body: IUpdateOrder) =>
      updateOrder(id as string, {
        ...body,
        deliveryDate: body.deliveryDate?.toISOString(),
      }),
    onSuccess: () => {
      addToast({
        title: `سفارش با موفقیت تحویل داده شد`,
        color: "success",
        timeout: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onClose();
    },
    onError: () => {
      addToast({
        title: `خطا در بروزرسانی سفارش`,
        color: "danger",
        timeout: 3000,
      });
    },
  });

  const handleSubmit = () => {
    mutate({
      deliveryStatus: true,
      deliveryDate: new Date(),
    });
  };

  const orderProducts: IUserOrderProduct[] = products.map((item) => ({
    _id: item.product,
    product: item.product,
    count: item.count,
  }));
  return (
    <>
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-linear-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        isOpen={true}
        onOpenChange={onClose}
        size="xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 items-center text-lg">
            نمایش سفارش
          </ModalHeader>
          <ModalBody className="space-y-2">
            <div className="flex gap-2 font-semibold">
              <p>
                نام مشتری : {user ? <GetUserName userId={user} /> : "نامشخص"}
              </p>
            </div>
            <Divider orientation="horizontal" />
            <div className="flex gap-2 font-semibold">
              <p>تاریخ ثبت سفارش : {createdAt}</p>
            </div>
            <Divider orientation="horizontal" />
            <div className="flex gap-2 font-semibold">
              <p>
                زمان تحویل :{" "}
                {deliveryDate
                  ? new Date(deliveryDate).toLocaleDateString("fa-IR")
                  : "تحویل داده نشده"}
              </p>
            </div>
            <Divider orientation="horizontal" />
            <div className="flex gap-2 font-medium">
              <p>
                وضعیت کالا :{" "}
                <span className="text-danger-500">
                  {deliveryStatus ? "ارسال شده" : "در انتظار ارسال"}
                </span>
              </p>
            </div>
            <Divider orientation="horizontal" />
            <div className="space-y-4 font-semibold">
              <p>محصولات خریداری شده :</p>
              <OrderProductsTable products={orderProducts} />
            </div>
            <Divider orientation="horizontal" />

            <div className="flex gap-2 font-semibold">
              <p>
                جمع مبلغ خرید :{" "}
                {new Intl.NumberFormat("fa-IR").format(totalPrice as number)}
              </p>
            </div>
          </ModalBody>
          <ModalFooter className="w-full flex items-center justify-center">
            <Button
              type="submit"
              color="danger"
              className="text-medium"
              variant="solid"
              isLoading={isPending}
              onClick={handleSubmit}
              isDisabled={deliveryStatus}
            >
              تحویل مرسوله
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoModal;
