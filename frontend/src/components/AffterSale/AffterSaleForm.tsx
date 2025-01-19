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
import { useAffterSaleContext } from "@/contexts/AffterSaleProvider";
import {
  useCreateAffterSale,
  useFetchAffterSale,
  useUpdateAffterSale,
} from "@/hooks/AffterSaleHooks";
import { DefaultInput } from "../Input/DefaultInput";
import DefaultSelect from "../Input/DefaultSelect";
import { AffterSaleStatus, AffterSaleType } from "@/types/affterSale";
import DefaultTextArea from "../Input/DefaultTextArea";

interface AffterSaleFormProps {}

export const AffterSaleForm: React.FC<AffterSaleFormProps> = () => {
  // Basic States
  const { dialog, setDialog } = useGlobalContext();
  const { loading } = useGlobalContext();
  const { ID } = useGlobalContext();
  const { errors, setErrors } = useGlobalContext();
  // After-Sale Editing States
  const { createRequest, updateRequest } = useAffterSaleContext();
  // Update after-sale request
  const { setCreateRequest, setUpdateRequest } = useAffterSaleContext();

  // Hook to fetch after-sale by ID
  const { fetchAffterSale } = useFetchAffterSale();
  // Hook to create after-sale
  const { createAffterSale } = useCreateAffterSale();
  // Hook to update after-sale
  const { updateAffterSale } = useUpdateAffterSale();

  // Dialog Handler
  const handler = () => {
    setDialog({ ...dialog, form: false });
  };

  // Handle change function
  const handleChange = (
    key: string,
    value: string | number | boolean | React.ChangeEvent<HTMLInputElement>
  ) => {
    if (ID.update) {
      // Update the After-Sale request state
      setUpdateRequest({ ...updateRequest, [key]: value });
    } else {
      // Create the After-Sale request state
      setCreateRequest({ ...createRequest, [key]: value });
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
      console.log("update after-sale", ID.update, updateRequest);
      // Update the after-sale
      updateAffterSale(ID.update, updateRequest);
    } else {
      console.log("create after-sale", createRequest);
      // Create the after-sale
      createAffterSale(createRequest);
    }
  };

  // UseEffect to fetch the after-sale by ID
  React.useEffect(() => {
    if (ID.update) {
      fetchAffterSale(ID.update);
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
                  {ID.update ? "Update After-Sale" : "Create After-Sale"}
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
                    ? "Update the after-sale details"
                    : "Fill in the after-sale details"}
                </Typography>
                {
                  // If in update mode, not show the client id and vehicle id input
                  ID.update ? null : (
                    <>
                      {/* Client ID */}
                      <DefaultInput
                        label="Client ID"
                        placeholder="Enter the Client ID"
                        value={createRequest.clientId}
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
                        value={createRequest.vehicleId}
                        error={getError("vehicleId")}
                        onChange={(e) =>
                          handleChange("vehicleId", Number(e.target.value))
                        }
                        smallMessage={""}
                      />
                    </>
                  )
                }
                {/* Cost */}
                <DefaultInput
                  label="Cost"
                  placeholder="Enter the Cost"
                  value={
                    ID.update
                      ? updateRequest.cost || 0
                      : createRequest.cost || 0
                  }
                  error={getError("cost")}
                  onChange={(e) => handleChange("cost", Number(e.target.value))}
                  type="number"
                  smallMessage="Enter the cost of the after-sale."
                />
                {/* Status Select */}
                <DefaultSelect
                  label="After-Sale Status"
                  value={
                    ID.update ? updateRequest.status : createRequest.status
                  }
                  error={getError("status")}
                  smallMessage="Select the status for the after-sale."
                  options={[
                    { id: AffterSaleStatus.IN_PROGRESS, name: "In Progress" },
                    { id: AffterSaleStatus.COMPLETED, name: "Completed" },
                    { id: AffterSaleStatus.SCHEUDLED, name: "Scheduled" },
                    { id: AffterSaleStatus.CANCELLED, name: "Cancelled" },
                  ]}
                  onChange={(value) =>
                    handleChange("status", value as AffterSaleStatus)
                  }
                  loading={false}
                />
                {/* Affter Sale Type */}
                <DefaultSelect
                  label="After-Sale Type"
                  value={ID.update ? updateRequest.type : createRequest.type}
                  error={getError("type")}
                  smallMessage="Select the type for the after-sale."
                  options={[
                    { id: AffterSaleType.REPAIR, name: "Repair" },
                    { id: AffterSaleType.MAINTENANCE, name: "Maintenance" },
                    { id: AffterSaleType.INSPECTION, name: "Inspection" },
                  ]}
                  onChange={(value) =>
                    handleChange("type", value as AffterSaleType)
                  }
                  loading={false}
                />
                {/* Appointment */}
                <DefaultInput
                  label="Appointment"
                  placeholder="Enter the Appointment"
                  value={
                    ID.update
                      ? updateRequest.appointment
                      : createRequest.appointment
                  }
                  error={getError("appointment")}
                  onChange={(e) => handleChange("appointment", e.target.value)}
                  smallMessage="Enter the appointment for the after-sale."
                  type="date"
                />
              </CardBody>
              {/* Description */}
              <div className="mx-6">
                <DefaultTextArea
                  label="Enter the Description"
                  placeholder="Enter the Description"
                  value={
                    ID.update
                      ? updateRequest.description
                      : createRequest.description
                  }
                  error={getError("description")}
                  onChange={(val) => handleChange("description", val)}
                  smallMessage="Enter the description for the after-sale."
                />
              </div>
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
                  {ID.update ? "Update After-Sale" : "Create After-Sale"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
};
