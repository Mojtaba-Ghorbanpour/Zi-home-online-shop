import { MenuIcon } from "@/public/svgs/icons";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import MegaMenuDropdown from "./maga-menu-dropdown";

const MegaMenuCategories = () => {
  return (
    <NavbarContent as="div" justify="center" className="gap-2">
      <Dropdown type="menu" placement="bottom-end">
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="text-sm font-medium"
              radius="sm"
              variant="light"
              startContent={<MenuIcon />}
            >
              دسته بندی ها
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <MegaMenuDropdown />
      </Dropdown>
    </NavbarContent>
  );
};

export default MegaMenuCategories;
