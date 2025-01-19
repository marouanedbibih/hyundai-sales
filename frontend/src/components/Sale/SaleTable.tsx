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

import { useSaleContext } from "@/contexts/SaleProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useDeleteSale } from "@/hooks/SaleHooks";
import { ISale, PaymentMethod } from "@/types/sale";
import { SmallTextTable } from "../Text/SmallTextTable";
import Pagination from "../Pagination/Pagination";
import DeleteConfirmationDialog from "../Dialog/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";

interface SaleTableProps {}

const TABLE_HEAD = [
  "Date",
  "Total Price",
  "Payment Method",
  "Client Name",
  "Username",
  "Vehicle Model",
  "Vehicle Color",
  "Vehicle Year",
  "Vehicle Price",
  "Actions",
];

export const SaleTable: React.FC<SaleTableProps> = () => {
  // Basics states
  const { salesData } = useSaleContext();
  const { loading } = useGlobalContext();
  const { pagination, setPagination } = useGlobalContext();
  const { ID, setID } = useGlobalContext();
  const { dialog, setDialog } = useGlobalContext();

  // Hook to delete sale
  const { deleteSale } = useDeleteSale();

  // Handle update sale
  const handleUpdateSale = (id: number) => {
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
    router.push(`/sale/${id}`); // Redirect to sale details page
    setID({ ...ID, fetch: id });
  };

  // get payement method color
  const getPaymentMethodColor = (paymentMethod: PaymentMethod) => {
    switch (paymentMethod) {
      case PaymentMethod.FULL:
        return "green";
      case PaymentMethod.INSTALLMENTS:
        return "blue";
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
          ) : salesData && salesData.length > 0 ? (
            salesData.map((sale: ISale) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={sale.id}>
                  <td className={classes}>
                    <SmallTextTable text={sale.date} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={`$${sale.totalPrice.toFixed(2)}`} />
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        value={sale.paymentMethod == PaymentMethod.FULL ? "Full" : sale.installments + " Installments"}
                        color={getPaymentMethodColor(sale.paymentMethod)}
                      />
                    </div>
                  </td>

                  <td className={classes}>
                    <SmallTextTable text={sale.clientName} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={sale.username} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={sale.vehicleModel} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={sale.vehicleColor} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={sale.vehicleYear.toString()} />
                  </td>
                  <td className={classes}>
                    <SmallTextTable text={`$${sale.vehiclePrice.toFixed(2)}`} />
                  </td>
                  <td className={`${classes} flex flex-row gap-2`}>
                    <Tooltip content="View Sale">
                      <IconButton
                        color="blue"
                        onClick={() => onView(sale.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Edit Sale">
                      <IconButton
                        color="green"
                        onClick={() => handleUpdateSale(sale.id)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Sale">
                      <IconButton
                        color="red"
                        onClick={() => handleDeleteDialog(sale.id)}
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
          deleteSale(ID.delete!);
        }}
        loading={loading.delete}
        message="Are you sure you want to delete this Sale?"
      />
    </CardBody>
  );
};
