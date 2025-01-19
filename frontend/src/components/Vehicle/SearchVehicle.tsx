"use client";

import React from "react";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchVehicles } from "@/hooks/VehicleHooks";

interface SearchVehicleProps {}

export const SearchVehicle: React.FC<SearchVehicleProps> = () => {
  // Search vehicle hooks
  const { setFetching, pagination, setSearchKeyword } = useSearchVehicles();

  // On search vehicle
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    pagination.initPagination();
    if (e.target.value !== "") {
      setFetching({ normal: false, filter: false, search: true });
      setSearchKeyword(e.target.value);
    } else {
      setFetching({ normal: true, filter: false, search: false });
      setSearchKeyword("");
    }
  };

  return (
    <div className="w-full md:w-72">
      <Input
        label="Search Vehicles"
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        onChange={onSearch}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
};
