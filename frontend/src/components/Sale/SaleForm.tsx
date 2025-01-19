/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useSaleContext } from "@/contexts/SaleProvider";
import { useCreateSale, useFetchSale, useUpdateSale } from "@/hooks/SaleHooks";
import { DefaultInput } from "../Input/DefaultInput";
import DefaultSelect from "../Input/DefaultSelect";

interface SaleFormProps {}

export const SaleForm: React.FC<SaleFormProps> = () => {
  // Basic States
  const { dialog, setDialog } = useGlobalContext();
  const { loading } = useGlobalContext();
  const { ID } = useGlobalContext();
  const { errors, setErrors } = useGlobalContext();
  // Sale Editing States
  const { saleRequest, setSaleRequest } = useSaleContext();
  // update sale request
  const { updateSaleRequest, setUpdateSaleRequest } = useSaleContext();

  // Hook to fetch sale by ID
  const { fetchSale } = useFetchSale();
  // Hook to create sale
  const { createSale } = useCreateSale();
  // Hook to update sale
  const { updateSale } = useUpdateSale();

  // Dialog Handler
  const handler = () => {
    setDialog({ ...dialog, form: false });
  };

  // Handle change function
  const handleChange = (
    key: string,
    value: string | number | boolean | React.ChangeEvent<HTMLInputElement>
  ) => {
    // if the installments is 0 set it to null
    if (key === "installments" && Number(value) === 0) {
      setSaleRequest({ ...saleRequest, [key]: null });
    } else {
      if (ID.update) {
        // Update the Sale request state
        setUpdateSaleRequest({ ...updateSaleRequest, [key]: value });
      } else {
        // Create the Sale request state
        setSaleRequest({ ...saleRequest, [key]: value });
      }
    }

    // Clear the error for this field if any
    setErrors(errors.filter((error) => error.key !== key));
  };

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const input = errors.find((error) => error.key === key);
    return input ? input.message : "";
  };

  // Handle Submit function
  const handleSubmit = async () => {
    if (ID.update) {
      console.log("update sale", ID.update, saleRequest);
      // Update the sale
      updateSale(ID.update, updateSaleRequest);
    } else {
      console.log("create sale", saleRequest);
      // Create the sale
      createSale(saleRequest);
    }
  };

  // UseEffect to fetch the sale by ID
  React.useEffect(() => {
    if (ID.update) {
      fetchSale(ID.update);
    }
  }, [ID.update]);

  return (
    <>
      <Dialog
        size="md"
        open={dialog.form}
        handler={handler}
        className="bg-transparent shadow-none"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Card
          className="mx-auto w-full max-w-[24rem] h-auto min-h-[200px]"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {loading.form ? (
            <div className="w-full h-60 flex flex-1 justify-center items-center">
              <Spinner
                className="h-8 w-8"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
          ) : (
            <div>
              <CardBody
                className="flex flex-col gap-4"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Typography
                  variant="h4"
                  color="blue-gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {ID.update ? "Update Sale" : "Create Sale"}
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {ID.update
                    ? "Update the sale details"
                    : "Fill in the sale details"}
                </Typography>
                {
                  // If in update mode, not whos the client id and vehicle id input
                  ID.update ? null : (
                    <>
                      {/* Client ID */}
                      <DefaultInput
                        label="Client ID"
                        placeholder="Enter the Client ID"
                        value={saleRequest.clientId}
                        error={getError("clientId")}
                        onChange={(e) =>
                          handleChange("clientId", Number(e.target.value))
                        }
                        smallMessage={""}
                      />
                      {/* Vehicle ID */}
                      <DefaultInput
                        label="Vehicle ID"
                        placeholder="Enter the Vehicle ID"
                        value={saleRequest.vehicleId}
                        error={getError("vehicleId")}
                        onChange={(e) =>
                          handleChange("vehicleId", Number(e.target.value))
                        }
                        smallMessage={""}
                      />
                    </>
                  )
                }
                {/* Total Price */}
                <DefaultInput
                  label="Total Price"
                  placeholder="Enter the Total Price"
                  value={
                    ID.update
                      ? updateSaleRequest.totalPrice
                      : saleRequest.totalPrice
                  }
                  error={getError("totalPrice")}
                  onChange={(e) =>
                    handleChange("totalPrice", Number(e.target.value))
                  }
                  smallMessage={""}
                />
                {/* Payment Method */}
                <DefaultSelect
                    label="Payment Method"
                    value={ID.update ? updateSaleRequest.paymentMethod : saleRequest.paymentMethod}
                    error={getError("paymentMethod")}
                    smallMessage="Select the payment method for the sale."
                    options={[
                      { id: "FULL", name: "FULL" },
                      { id: "INSTALLMENTS", name: "INSTALLMENTS" },
                    ]}
                    onChange={(value) => handleChange("paymentMethod", value as string)}
                    loading={false}
                  />
                {/* Show installments input only if payment method is INSTALLMENTS */}
                {(saleRequest.paymentMethod === "INSTALLMENTS" || (ID.update && updateSaleRequest.paymentMethod === "INSTALLMENTS")) && (
                  <DefaultInput
                    label="Installments"
                    placeholder="Enter the Installments"
                    value={ID.update ? updateSaleRequest.installments || 0 : saleRequest.installments || 0}
                    error={getError("installments")}
                    onChange={(e) =>
                      handleChange("installments", Number(e.target.value))
                    }
                    type="number"
                    smallMessage="Enter the number of installments for the sale."
                  />
                )}
              </CardBody>
              <CardFooter
                className="pt-0"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Button
                  variant="gradient"
                  fullWidth
                  onClick={handleSubmit}
                  color="green"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {ID.update ? "Update Sale" : "Create Sale"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
};
