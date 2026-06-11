"use client";

import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteProduct } from "@/app/apis/product.api";

const DeleteProductModal: React.FC<IDeleteProductModalProps> = ({
  id,
  productName,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      addToast({
        title: `${productName} از فروشگاه حذف شد`,
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      onClose();
    },
    onError: () => {
      addToast({
        title: `خطا در حذف ${productName}`,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <Modal backdrop="opaque" isOpen={true} onOpenChange={onClose} size="xs">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center text-lg">
              حذف کالا
            </ModalHeader>
            <ModalBody>
              <p className="text-center text-natural-500 text-base">
                آیا مطمئن هستید که می‌خواهید
                <span className="font-bold text-danger-500">
                  {" "}
                  {productName}{" "}
                </span>
                را از فروشگاه حذف کنید؟
              </p>
            </ModalBody>
            <ModalFooter className="w-full flex items-center justify-center">
              <Button
                color="default"
                variant="light"
                onClick={onClose}
                className="font-semibold"
              >
                لغو
              </Button>
              <Button
                color="danger"
                onClick={handleDelete}
                className="font-semibold"
                isLoading={mutation.isPending}
              >
                حذف
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteProductModal;
