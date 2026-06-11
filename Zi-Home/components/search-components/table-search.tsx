import { SearchIcon } from "@/public/svgs/icons";
import { Input } from "@heroui/react";

interface ITableSearchProps {
  value: string;
  onChange: (val: string) => void;
  onClear?: () => void;
}

const TableSearch = ({ value, onChange, onClear }: ITableSearchProps) => {
  return (
    <Input
      placeholder="جستجو محصول"
      startContent={<SearchIcon />}
      type="text"
      size="md"
      variant="bordered"
      isClearable
      value={value}
      onValueChange={onChange}
      onClear={onClear}
      className="w-1/3"
    />
  );
};

export default TableSearch;
