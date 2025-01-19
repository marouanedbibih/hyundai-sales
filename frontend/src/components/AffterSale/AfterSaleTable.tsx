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

import { useAffterSaleContext } from "@/contexts/AffterSaleProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useDeleteAffterSale } from "@/hooks/AffterSaleHooks";
import {
  IAffterSale,
  AffterSaleStatus,
  AffterSaleType,
} from "@/types/affterSale";
import { SmallTextTable } from "../Text/SmallTextTable";
import Pagination from "../Pagination/Pagination";
import DeleteConfirmationDialog from "../Dialog/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";

interface AffterSaleTableProps {}

const TABLE_HEAD = [
  "Date",
  "Description",
  "Cost",
  "Status",
  "Type",
  "Client Name",
  "Username",
  "Vehicle",
  "Actions",
];

export const AffterSaleTable: React.FC<AffterSaleTableProps> = () => {
  const { data } = useAffterSaleContext();
  const { loading } = useGlobalContext();
  const { pagination, setPagination } = useGlobalContext();
  const { ID, setID } = useGlobalContext();
  const { dialog, setDialog } = useGlobalContext();

  const { deleteAffterSale } = useDeleteAffterSale();

  const handleUpdateAffterSale = (id: number) => {
    setID({ ...ID, update: id });
    setDialog({ ...dialog, form: true });
  };

  const handleDeleteDialog = (id: number) => {
    setID({ ...ID, delete: id });
    setDialog({ ...dialog, delete: true });
  };

  const router = useRouter();
  const onView = (id: number) => {
    router.push(`/afftersale/${id}`);
    setID({ ...ID, fetch: id });
  };

  const getStatusColor = (status: AffterSaleStatus) => {
    switch (status) {
      case AffterSaleStatus.COMPLETED:
        return "green";
      case AffterSaleStatus.SCHEUDLED:
        return "yellow";
      case AffterSaleStatus.CANCELLED:
        return "red";
      default:
        return "gray";
    }
  };

  const getTypeColor = (type: AffterSaleType) => {
    switch (type) {
      case AffterSaleType.REPAIR:
        return "red";
      case AffterSaleType.MAINTENANCE:
        return "blue";
      case AffterSaleType.INSPECTION:
        return "green";
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
            data.map((affterSale: IAffterSale) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={affterSale.id}>
                  <td className={classes}>
                    <SmallTextTable text={affterSale.appointment} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={affterSale.description} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={`$${affterSale.cost.toFixed(2)}`} />
                  </td>
                  <td className={classes}>
                    <Chip
                      variant="ghost"
                      value={affterSale.status}
                      color={getStatusColor(affterSale.status)}
                    />
                  </td>
                  <td className={classes}>
                    <Chip
                      variant="ghost"
                      value={affterSale.type}
                      color={getTypeColor(affterSale.type)}
                    />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={affterSale.clientName} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={affterSale.username} />
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col justify-start items-start gap-1">
                      <SmallTextTable text={affterSale.vehicleModel} />
                      <SmallTextTable text={affterSale.vehicleColor} />
                      <SmallTextTable
                        text={affterSale.vehicleYear.toString()}
                      />
                      <SmallTextTable
                        text={`$${affterSale.vehiclePrice.toFixed(2)}`}
                      />
                    </div>
                  </td>
                  <td className={`${classes}`}>
                    <div className="flex flex-1 justify-center items-center gap-2">
                      <Tooltip content="View After-Sale">
                        <IconButton
                          color="blue"
                          onClick={() => onView(affterSale.id)}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Edit After-Sale">
                        <IconButton
                          color="green"
                          onClick={() => handleUpdateAffterSale(affterSale.id)}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete After-Sale">
                        <IconButton
                          color="red"
                          onClick={() => handleDeleteDialog(affterSale.id)}
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </div>
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
        handleConfirm={() => deleteAffterSale(ID.delete!)}
        loading={loading.delete}
        message="Are you sure you want to delete this After-Sale?"
      />
    </CardBody>
  );
};
