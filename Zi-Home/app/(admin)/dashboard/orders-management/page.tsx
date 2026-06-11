import OrdersTable from "@/components/table-components/orders-table/orders-table";

const OrdersPage = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold ">مدیریت سفارش ها</h3>
      <OrdersTable />
    </div>
  );
};
export default OrdersPage;
