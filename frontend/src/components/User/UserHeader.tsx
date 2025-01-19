import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { CardHeader, Button } from "@material-tailwind/react";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useUserContext } from "@/contexts/UserProvider"; // Adjust to the User context provider
import { SearchUser } from "./SearchUser"; // Adjust to the search component for users

interface UserHeaderProps {}

const UserHeader: React.FC<UserHeaderProps> = () => {
  // Form dialog state
  const { dialog, setDialog } = useGlobalContext();
  // Init User Request
  const { initRequest } = useUserContext(); // Adjust to the init function for users

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
          <SearchUser /> {/* Adjusted to the user search component */}
          <Button
            className="flex items-center gap-3"
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="green"
            onClick={handleOpenForm}
          >
            <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New User
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default UserHeader;
