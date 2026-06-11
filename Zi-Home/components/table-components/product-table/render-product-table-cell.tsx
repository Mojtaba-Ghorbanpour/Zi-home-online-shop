import ProductAction from "@/components/modal-component/action-components/product-action";
import GetCategoryName from "./get-category-name";
import GetSubcategoryName from "./get-subcategory-name";

const RenderProductTableCell = ({
  product,
  columnKey,
}: {
  product: IProduct;
  columnKey: string;
}) => {
  switch (columnKey) {
    case "name":
      return product.name;
    case "category": {
      return <GetCategoryName categoryId={product.category} />;
    }
    case "subcategory": {
      return <GetSubcategoryName subcategoryId={product.subcategory} />;
    }
    case "id":
      return product.id;
    case "actions":
      return <ProductAction product={product} />;
  }
};

export default RenderProductTableCell;
