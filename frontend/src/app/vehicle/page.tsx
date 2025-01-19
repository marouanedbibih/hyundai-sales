"use client";

import { VehicleForm } from "@/components/Vehicle/VehicleForm";
import VehicleHeader from "@/components/Vehicle/VehicleHeader";
import { VehicleTable } from "@/components/Vehicle/VehicleTable";
import { Card } from "@material-tailwind/react";
import React from "react";

const VehiclePage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-start mx-auto gap-4 ">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <VehicleHeader />
        <VehicleTable />
        <VehicleForm />
      </Card>
    </div>
  );
};

export default VehiclePage;
