"use client";

import React from "react";
import {
  CardBody,
  Spinner,
  Typography,
  Tooltip,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

import { useVehicleContext } from "@/contexts/VehicleProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useDeleteVehicle } from "@/hooks/VehicleHooks";
import { IVehicle, VehicleStatus } from "@/types/vehicle";
import { SmallTextTable } from "../Text/SmallTextTable";
import Pagination from "../Pagination/Pagination";
import DeleteConfirmationDialog from "../Dialog/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";

interface VehicleTableProps {}

const TABLE_HEAD = [
  "ID",
  "Model",
  "Year",
  "Price",
  "Color",
  "Status",
  "Promotion",
  "Actions",
];

export const VehicleTable: React.FC<VehicleTableProps> = () => {
  // Basic states
  const { data } = useVehicleContext();
  const { loading } = useGlobalContext();
  const { pagination, setPagination } = useGlobalContext();
  const { ID, setID } = useGlobalContext();
  const { dialog, setDialog } = useGlobalContext();

  // Hook to delete vehicle
  const { deleteVehicle } = useDeleteVehicle();

  // Handle update vehicle
  const handleUpdateVehicle = (id: number) => {
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
    router.push(`/vehicle/${id}`); // Redirect to vehicle details page
    setID({ ...ID, fetch: id });
  };

  // Get Status color
  const getStatusColor = (status: VehicleStatus) => {
    switch (status) {
      case VehicleStatus.AVAILABLE:
        return "green";
      case VehicleStatus.ORDERED:
        return "blue";
      case VehicleStatus.SOLD:
        return "red";
      default:
        return "gray";
    }
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
            data.map((vehicle: IVehicle) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={vehicle.id}>
                  <td className={classes}>
                    <SmallTextTable text={vehicle.id.toString()} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={vehicle.model} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={vehicle.year.toString()} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={`$${vehicle.price.toFixed(2)}`} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={vehicle.color} />
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        value={vehicle.status.toString()}
                        color={getStatusColor(vehicle.status)}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        value={vehicle.isPromotion ? `$${vehicle.discount?.toFixed(2)}` : "No"}
                        color={vehicle.isPromotion ? "green" : "red"}
                      />
                    </div>
                  </td>
                  <td className={`${classes} flex flex-row gap-2`}>
                    <Tooltip content="View Vehicle">
                      <IconButton
                        color="blue"
                        onClick={() => onView(vehicle.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Edit Vehicle">
                      <IconButton
                        color="green"
                        onClick={() => handleUpdateVehicle(vehicle.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Vehicle">
                      <IconButton
                        color="red"
                        onClick={() => handleDeleteDialog(vehicle.id)}
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
        onPageChange={(page) =>
          setPagination({ ...pagination, currentPage: page })
        }
      />
      <DeleteConfirmationDialog
        open={dialog.delete}
        handleClose={() => setDialog({ ...dialog, delete: false })}
        handleConfirm={() => deleteVehicle(ID.delete!)}
        loading={loading.delete}
        message="Are you sure you want to delete this Vehicle?"
      />
    </CardBody>
  );
};
