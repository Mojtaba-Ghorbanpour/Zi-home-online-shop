import { AddIcon } from "@/public/svgs/icons";
import { Button } from "@heroui/react";
import React from "react";
import AddProductModal from "../add-product-modal";

const AddProductAction = () => {
  const [openAddProduct, setOpenAddProduct] = React.useState(false);
  return (
    <div className="relative flex justify-center items-center gap-2">
      <Button
        onClick={() => setOpenAddProduct(true)}
        isIconOnly
        variant="light"
        color="danger"
      >
        <AddIcon />
      </Button>

      {openAddProduct && (
        <AddProductModal onClose={() => setOpenAddProduct(false)} />
      )}
    </div>
  );
};

export default AddProductAction;
