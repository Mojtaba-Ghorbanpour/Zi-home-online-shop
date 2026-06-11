import { AccountIcon, ArrowDownIcon } from "@/public/svgs/icons";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";

const DefaultDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          className="border-natural-100"
          variant="bordered"
          startContent={<AccountIcon />}
          endContent={<ArrowDownIcon />}
        />
      </DropdownTrigger>

      <DropdownMenu variant="flat">
        <DropdownItem key="signup">
          <Link href={"/signup"} className="font-semibold">
            ثبت نام
          </Link>
        </DropdownItem>
        <DropdownItem key="signin">
          <Link href={"/login"} className="font-semibold">
            ورود
          </Link>
        </DropdownItem>
        <DropdownItem key="Admin-panel">
          <Link href={"/admin"} className="font-semibold">
            پنل مدیریت
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DefaultDropdown;
