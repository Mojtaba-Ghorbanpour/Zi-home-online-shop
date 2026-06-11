"use client";

import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Button,
} from "@heroui/react";
import { DeleteIcon } from "@/public/svgs/icons";

const DeleteCartItem: React.FC<IDeleteCartItemProps> = ({
  itemName,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmDelete = () => {
    localStorage.removeItem(`product-${itemName}`);
    onDelete(itemName);
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer p-2">
        <DeleteIcon />
      </div>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>حذف محصول</ModalHeader>
          <ModalBody>
            آیا مطمئن هستید می‌خواهید محصول "{itemName}" را حذف کنید؟
          </ModalBody>
          <ModalFooter className="flex justify-end gap-3">
            <Button
              variant="light"
              className="font-medium"
              onClick={() => setIsOpen(false)}
            >
              لغو
            </Button>
            <Button
              color="danger"
              className="font-medium"
              onClick={handleConfirmDelete}
            >
              حذف
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteCartItem;
