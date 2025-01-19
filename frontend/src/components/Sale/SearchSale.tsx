"use client";

import React from "react";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchSales } from "@/hooks/SaleHooks";

interface SearchSaleProps {}

export const SearchSale: React.FC<SearchSaleProps> = () => {
  // Search sales hooks
  const { setFetching, pagination, setSearchKeyword } = useSearchSales();

  // On search sales
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
        label="Search Sales"
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        onChange={onSearch}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
};
