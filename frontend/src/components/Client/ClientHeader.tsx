import React from "react";
import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { CardHeader, Button } from "@material-tailwind/react";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useClientContext } from "@/contexts/ClientProvider";
import { SearchClient } from "./SearchClient";

interface ClientHeaderProps {}

const ClientHeader: React.FC<ClientHeaderProps> = () => {
  // Form dialog state
  const { dialog, setDialog } = useGlobalContext();
  // Init Client Request
  const { initRequest } = useClientContext();

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
          <SearchClient />
          <Button
            className="flex items-center gap-3"
            size="sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            color="green"
            onClick={handleOpenForm}
          >
            <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> New Client
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ClientHeader;
