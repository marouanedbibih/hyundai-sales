/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { Navbar } from "@material-tailwind/react";

import { ProfileMenu } from "./ProfileMenu";

export function DefaultNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar
      className="p-2 lg:rounded-xl "
      fullWidth
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <ProfileMenu />
      </div>
    </Navbar>
  );
}
