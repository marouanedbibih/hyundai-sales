"use client";

import { ClientForm } from "@/components/Client/ClientForm";
import ClientHeader from "@/components/Client/ClientHeader";
import { ClientTable } from "@/components/Client/ClientTable";
import { Card } from "@material-tailwind/react";
import React from "react";

const ClientPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto gap-4 ">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ClientHeader />
        <ClientTable />
        <ClientForm />
      </Card>
    </div>
  );
};

export default ClientPage;
