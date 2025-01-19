"use client";

import React from "react";
import {
  CardBody,
  Spinner,
  Typography,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

import { useClientContext } from "@/contexts/ClientProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useDeleteClient } from "@/hooks/ClientHooks";
import { IClient } from "@/types/client";
import { SmallTextTable } from "../Text/SmallTextTable";
import Pagination from "../Pagination/Pagination";
import DeleteConfirmationDialog from "../Dialog/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";

interface ClientTableProps {}

const TABLE_HEAD = [
  "ID",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Address",
  "Actions",
];

export const ClientTable: React.FC<ClientTableProps> = () => {
  // Basics states
  const { data } = useClientContext();
  const { loading } = useGlobalContext();
  const { pagination, setPagination } = useGlobalContext();
  const { ID, setID } = useGlobalContext();
  const { dialog, setDialog } = useGlobalContext();

  // Hook to delete client
  const { deleteClient } = useDeleteClient();

  // Handle update client
  const handleUpdateClient = (id: number) => {
    setID({ ...ID, update: id });
    setDialog({ ...dialog, form: true });
  };

  // Handle delete dialog
  const handleDeleteDialog = (id: number) => {
    setID({ ...ID, delete: id });
    setDialog({ ...dialog, delete: true });
  };


  const router = useRouter(); // Initialize router hook
  // OnView
  const onView = (id: number) => {
    router.push(`/client/${id}`); // Redirect to client details page
    setID({ ...ID, fetch: id });
  };

  return (
    <CardBody
      className="px-0"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading.table ? (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                <div className="w-full flex flex-1 justify-center items-center">
                  <Spinner
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((client: IClient) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={client.id}>
                  <td className={classes}>
                    <SmallTextTable text={client.id.toString()} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={client.firstName} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={client.lastName} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={client.email} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={client.phone} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={client.address} />
                  </td>

                  <td className={`${classes} flex flex-row gap-2`}>
                    <Tooltip content="View Client">
                      <IconButton
                        color="blue"
                        onClick={() => onView(client.id)} // Call onView to redirect
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Edit Client">
                      <IconButton
                        color="green"
                        onClick={() => handleUpdateClient(client.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Client">
                      <IconButton
                        color="red"
                        onClick={() => handleDeleteDialog(client.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        onPageChange={(page) => {
          setPagination({ ...pagination, currentPage: page });
        }}
      />
      <DeleteConfirmationDialog
        open={dialog.delete}
        handleClose={() => setDialog({ ...dialog, delete: false })}
        handleConfirm={() => {
          deleteClient(ID.delete!);
        }}
        loading={loading.delete}
        message="Are you sure you want to delete this Client?"
      />
    </CardBody>
  );
};
