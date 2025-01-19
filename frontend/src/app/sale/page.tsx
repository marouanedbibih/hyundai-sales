"use client";


import { SaleForm } from "@/components/Sale/SaleForm";
import SaleHeader from "@/components/Sale/SaleHeader";
import { SaleTable } from "@/components/Sale/SaleTable";
import { Card } from "@material-tailwind/react";
import React from "react";

const SalePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto gap-4 ">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <SaleHeader />
        <SaleTable />
        <SaleForm />
      </Card>
    </div>
  );
};

export default SalePage;
