"use client";

import { AffterSaleForm } from "@/components/AffterSale/AffterSaleForm";
import AffterSaleHeader from "@/components/AffterSale/AffterSaleHeader";
import { AffterSaleTable } from "@/components/AffterSale/AfterSaleTable";
import { Card } from "@material-tailwind/react";
import React from "react";

const AffterSalePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto gap-4 ">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <AffterSaleHeader />
        <AffterSaleTable />
        <AffterSaleForm />
      </Card>
    </div>
  );
};

export default AffterSalePage;
