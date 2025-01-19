import React from "react";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchUsers } from "@/hooks/UserHooks"; // Replace with the appropriate hook for users

interface SearchUserProps {}

export const SearchUser: React.FC<SearchUserProps> = () => {
  // Search user hooks
  const { setFetching, pagination, setSearchKeyword } = useSearchUsers(); // Adjust the hook to fetch users

  // On search user
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
        label="Search"
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        onChange={onSearch}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
};
