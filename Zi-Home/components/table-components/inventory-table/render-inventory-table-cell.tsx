import React from "react";

const RenderInventoryTableCell = ({
  product,
  columnKey,
  editableCells,
  setEditableCells,
}: {
  product: IProduct;
  columnKey: string;
  editableCells: any;
  setEditableCells: any;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const value =
    editableCells[product.id as string]?.[columnKey] ??
    product[columnKey as keyof IProduct];

  const handleDoubleClick = () => {
    if (columnKey === "price" || columnKey === "quantity") {
      setIsEditing(true);
    }
  };

  const handleChange = (event: any) => {
    const newValue = event.target.value;
    setEditableCells((prev: any) => ({
      ...prev,
      [product.id as string]: {
        ...prev[product.id as string],
        [columnKey]: newValue ? Number(newValue) : "",
      },
    }));
  };

  const handleInput = () => {
    setIsEditing(false);
  };

  if (columnKey === "product") return <p>{product.name}</p>;

  return isEditing ? (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      onBlur={handleInput}
      className="border rounded px-1 w-20"
      autoFocus
    />
  ) : (
    <p onDoubleClick={handleDoubleClick}>
      {new Intl.NumberFormat("fa-IR").format(Number(value))}
    </p>
  );
};

export default RenderInventoryTableCell;
