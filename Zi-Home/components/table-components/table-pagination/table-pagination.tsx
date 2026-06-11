"use client";
import React from "react";
import { Pagination } from "@heroui/react";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  onChange: (nextPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  totalPages,
  onChange,
}) => {
  return (
    <div className="py-2 px-2 flex justify-center items-center">
      <Pagination
        color="danger"
        page={page}
        total={totalPages}
        variant="flat"
        onChange={onChange}
      />
    </div>
  );
};

export default TablePagination;
