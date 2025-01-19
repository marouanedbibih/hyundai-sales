"use client";
import React from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useLocalStorageContext } from "@/contexts/LocalStorageProvider";

// Profile menu component
export function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const { removeRoleFromLocalStorage, removeTokenFromLocalStorage } = useLocalStorageContext();
  const router = useRouter();

  const onSignOut = () => {
    closeMenu();
    router.push("/");
    removeRoleFromLocalStorage();
    removeTokenFromLocalStorage();
  };


  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="User Avatar"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList
        className="p-1"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <MenuItem
          onClick={onSignOut}
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <PowerIcon className="h-4 w-4 text-red-500" strokeWidth={2} />
          <Typography
            as="span"
            variant="small"
            className="font-normal text-red-500"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
