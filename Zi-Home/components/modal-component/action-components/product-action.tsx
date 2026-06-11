import EditProductModal from "@/components/modal-component/edit-product-modal";
import { DeleteIcon, EditIcon } from "@/public/svgs/icons";
import { Button } from "@heroui/react";
import React from "react";
import DeleteProductModal from "../delete-product-modal";

const ProductAction = ({ product }: { product: IProduct }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  return (
    <div className="relative flex justify-center items-center gap-2">
      <Button
        onClick={() => setOpenEdit(true)}
        isIconOnly
        variant="light"
        color="danger"
      >
        <EditIcon />
      </Button>

      {openEdit && (
        <EditProductModal
          productName={product.name as string}
          category={product.category}
          subcategory={product.subcategory}
          thumbnail={product.thumbnail}
          id={product.id as string}
          brand={product.brand as string}
          price={product.price as number}
          quantity={product.quantity as number}
          onClose={() => setOpenEdit(false)}
          description={product.description as string}
        />
      )}

      <Button
        key={`${product._id}-delete`}
        size="sm"
        isIconOnly
        variant="light"
        onClick={() => setOpenDelete(true)}
      >
        <DeleteIcon />
      </Button>
      {openDelete && (
        <DeleteProductModal
          id={product.id as string}
          productName={product.name as string}
          onClose={() => setOpenDelete(false)}
        />
      )}
    </div>
  );
};

export default ProductAction;
