import LogoutModal from "@/components/modal-component/logout-modal";
import { ArrowDownIcon, ValidUser } from "@/public/svgs/icons";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Link from "next/link";

const LoggedInDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          className="border-natural-100"
          variant="bordered"
          startContent={<ValidUser />}
          endContent={<ArrowDownIcon />}
        />
      </DropdownTrigger>

      <DropdownMenu variant="flat">
        <DropdownItem key="profile">
          <Link href={"/profile"} className="font-semibold">
            پروفایل
          </Link>
        </DropdownItem>
        <DropdownItem key="logout" closeOnSelect={false}>
          <LogoutModal />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LoggedInDropdown;
