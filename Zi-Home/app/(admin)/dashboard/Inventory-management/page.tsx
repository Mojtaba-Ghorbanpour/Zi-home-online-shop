"use client";

import InventoryTable from "@/components/table-components/inventory-table/inventory-table";

const InventoryPage = () => {
  return (
    <div>
      <p className="text-xl font-semibold ">موجودی و قیمت ها</p>
      <InventoryTable />
    </div>
  );
};
export default InventoryPage;
