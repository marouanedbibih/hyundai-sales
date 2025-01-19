/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Spinner,
  Checkbox,
} from "@material-tailwind/react";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useVehicleContext } from "@/contexts/VehicleProvider";
import {
  useCreateVehicle,
  useFetchVehicle,
  useUpdateVehicle,
} from "@/hooks/VehicleHooks";
import { DefaultInput } from "../Input/DefaultInput";
import { VehicleStatus } from "@/types/vehicle";
import DefaultSelect from "../Input/DefaultSelect";

interface VehicleFormProps {}

export const VehicleForm: React.FC<VehicleFormProps> = ({}) => {
  // Basic States
  const { dialog, setDialog } = useGlobalContext();
  const { loading } = useGlobalContext();
  const { ID } = useGlobalContext();
  const { errors, setErrors } = useGlobalContext();
  // Vehicle Editing States
  const { request, setRequest } = useVehicleContext();

  // Hook to fetch vehicle by ID
  const { fetchVehicle } = useFetchVehicle();
  // Hook to create vehicle
  const { createVehicle } = useCreateVehicle();
  // Hook to update vehicle
  const { updateVehicle } = useUpdateVehicle();

  // Dialog Handler
  const handler = () => {
    setDialog({ ...dialog, form: false });
  };

  // Handle change function
  const handleChange = (
    key: string,
    value: string | number | boolean | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update the Vehicle request state
    setRequest({ ...request, [key]: value });
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
    console.log("Vehicle Request", request);
    if (ID.update) {
      // Update the vehicle
      updateVehicle(ID.update, request);
    } else {
      // Create the vehicle
      createVehicle(request);
    }
  };

  // UseEffect to fetch the vehicle by ID
  React.useEffect(() => {
    if (ID.update) {
      fetchVehicle(ID.update);
    }
  }, [ID.update]);

  const handleCheckboxChange = (event: any) => {
    setRequest({ ...request, isPromotion: event.target.checked });
    handleChange("isPromotion", event.target.checked); // Update your form or state as needed
  };

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
                  {ID.update ? "Update Vehicle" : "Create Vehicle"}
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
                    ? "Update the vehicle details"
                    : "Fill in the vehicle details"}
                </Typography>
                <DefaultInput
                  label="Vehicle Model"
                  placeholder="Enter the Vehicle Model"
                  value={request.model}
                  error={getError("model")}
                  smallMessage="The model of the vehicle."
                  onChange={(e) => handleChange("model", e.target.value)}
                />
                <DefaultInput
                  label="Vehicle Year"
                  placeholder="Enter the Vehicle Year"
                  value={request.year ?? ""}
                  error={getError("year")}
                  smallMessage="The year of manufacture."
                  type="number"
                  onChange={(e) => handleChange("year", Number(e.target.value))}
                />
                <DefaultInput
                  label="Vehicle Price"
                  placeholder="Enter the Vehicle Price"
                  value={request.price ?? ""}
                  error={getError("price")}
                  smallMessage="The price of the vehicle."
                  type="number"
                  onChange={(e) =>
                    handleChange("price", Number(e.target.value))
                  }
                />
                <DefaultInput
                  label="Vehicle Color"
                  placeholder="Enter the Vehicle Color"
                  value={request.color}
                  error={getError("color")}
                  smallMessage="The color of the vehicle."
                  onChange={(e) => handleChange("color", e.target.value)}
                />
                <DefaultSelect
                  label="Vehicle Status"
                  value={request.status}
                  error={getError("status")}
                  smallMessage="The status of the vehicle."
                  options={[
                    {
                      id: VehicleStatus.AVAILABLE.toString(),
                      name: "Available",
                    },
                    { id: VehicleStatus.ORDERED.toString(), name: "Ordered" },
                    { id: VehicleStatus.SOLD.toString(), name: "Sold" },
                  ]}
                  onChange={(value) =>
                    handleChange("status", value as VehicleStatus)
                  }
                  loading={false}
                />
                <div className="flex flex-1 justify-start items-center gap-4">
                  <Checkbox
                    id="isSecretaryCheckbox"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                    checked={request.isPromotion}
                    onChange={handleCheckboxChange}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined} // other props as needed
                  />
                  <Typography
                    color="blue-gray"
                    className="font-medium"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Is Promotion
                  </Typography>
                </div>
                {request.isPromotion && (
                  <DefaultInput
                    label="Discount"
                    placeholder="Enter the Discount"
                    value={request.discount ?? ""}
                    error={getError("discount")}
                    smallMessage="Discount applied to the vehicle."
                    type="number"
                    onChange={(e) =>
                      handleChange("discount", Number(e.target.value))
                    }
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
                  {ID.update ? "Update Vehicle" : "Create Vehicle"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
};
