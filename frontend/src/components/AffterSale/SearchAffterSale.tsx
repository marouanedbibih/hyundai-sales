"use client";

import React from "react";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchAffterSales } from "@/hooks/AffterSaleHooks";

interface SearchAffterSaleProps {}

export const SearchAffterSale: React.FC<SearchAffterSaleProps> = () => {
  // Search after-sales hooks
  const { setFetching, pagination, setSearchKeyword } = useSearchAffterSales();

  // On search after-sales
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
        label="Search After-Sales"
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        onChange={onSearch}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
};
