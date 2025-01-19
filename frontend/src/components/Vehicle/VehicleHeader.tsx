"use client";

import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { CardHeader, Button } from "@material-tailwind/react";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useVehicleContext } from "@/contexts/VehicleProvider";
import { SearchVehicle } from "./SearchVehicle";

interface VehicleHeaderProps {}

const VehicleHeader: React.FC<VehicleHeaderProps> = () => {
  // Form dialog state
  const { dialog, setDialog } = useGlobalContext();
  // Init Vehicle Request
  const { initRequest } = useVehicleContext();

  // Handle open form function
  const handleOpenForm = () => {
    initRequest();
    setDialog({ ...dialog, form: true });
  };

  return (
    <CardHeader
      floated={false}
      shadow={false}
      className="rounded-none"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div className="flex w-full shrink-0 gap-2 md:w-max justify-end flex-1">
          <SearchVehicle />
          <Button
            className="flex items-center gap-3"
            size="sm"
            color="green"
            onClick={handleOpenForm}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New Vehicle
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default VehicleHeader;
