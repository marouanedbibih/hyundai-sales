"use client";

import { UserForm } from "@/components/User/UserForm";
import UserHeader from "@/components/User/UserHeader";
import { UserTable } from "@/components/User/UserTable";
import { Card } from "@material-tailwind/react";
import React from "react";

const UserPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto gap-4 ">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <UserHeader />
        <UserTable />
        <UserForm />
      </Card>
    </div>
  );
};

export default UserPage;
