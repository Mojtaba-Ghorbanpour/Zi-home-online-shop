import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import RenderPersonOrderTableCell from "./render-person-orderTableCell";

const OrderProductsTable = ({
  products,
}: {
  products: IUserOrderProduct[];
}) => {
  const columns = [
    { name: "شناسه محصول", uid: "id" },
    { name: "نام محصول", uid: "product" },
    { name: "تعداد", uid: "count" },
  ];

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align="start"
            className={`font-semibold text-base text-danger-500`}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={products}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell className="font-semibold text-natural-800">
                <RenderPersonOrderTableCell
                  product={item}
                  columnKey={columnKey as string}
                />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrderProductsTable;
