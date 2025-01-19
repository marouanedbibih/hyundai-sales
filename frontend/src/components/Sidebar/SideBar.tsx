/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  IdentificationIcon,
  TruckIcon,
  UsersIcon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import { useLocalStorageContext } from "@/contexts/LocalStorageProvider";

interface SideBarProps {}

const menuItems = [

  {
    title: "Users",
    path: "/user",
    icon: UsersIcon,
    role: ["ADMIN"],
  },
  {
    title: "Client",
    path: "/client",
    icon: IdentificationIcon,
    role: ["ADMIN", "SELLER","AFFTER_SALES_MANAGER"],
  },
  {
    title: "Vehicle",
    path: "/vehicle",
    icon: TruckIcon,
    role: ["ADMIN", "SELLER","AFFTER_SALES_MANAGER"],
  },
  {
    title: "Sales",
    path: "/sale",
    icon: BanknotesIcon,
    role: ["ADMIN", "SELLER"],
  },
  {
    title: "Affter Sales",
    path: "/affter-sale",
    icon: WrenchScrewdriverIcon,
    role: ["ADMIN", "AFFTER_SALES_MANAGER"],
  }
];

export const SideBar: React.FC<SideBarProps> = () => {
  const pathname = usePathname() || "";
  const router = useRouter();

  // Get the role from the global context
  const { getRoleFromLocalStorage } = useLocalStorageContext();
  const role = getRoleFromLocalStorage();

  // Filter menu items based on the user's role
  const filteredMenuItems = menuItems.filter((item) =>
    // @ts-ignore
    item.role.includes(role)
  );

  return (
    <Card
      className="fixed h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl bg-white"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      placeholder={undefined}
    >
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Hyundai
        </Typography>
      </div>
      <List
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {filteredMenuItems.map((item) => (
          <ListItem
            key={item.title}
            className={`hover:bg-blue-gray-50 cursor-pointer ${
              pathname.startsWith(item.path)
                ? "bg-blue-gray-50 font-semibold"
                : ""
            }`}
            onClick={() => router.push(item.path)}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <ListItemPrefix
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <item.icon
                className={`h-5 w-5 ${
                  pathname.startsWith(item.path)
                    ? "text-blue-gray-900"
                    : "text-blue-gray-700"
                }`}
              />
            </ListItemPrefix>
            {item.title}
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
