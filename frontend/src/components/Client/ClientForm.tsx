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
import { useClientContext } from "@/contexts/ClientProvider";
import {
  useCreateClient,
  useFetchClient,
  useUpdateClient,
} from "@/hooks/ClientHooks";
import { DefaultInput } from "../Input/DefaultInput";

interface ClientFormProps {}
export const ClientForm: React.FC<ClientFormProps> = ({}) => {
  // Basic States
  const { dialog, setDialog } = useGlobalContext();
  const { loading } = useGlobalContext();
  const { ID } = useGlobalContext();
  const { errors, setErrors } = useGlobalContext();
  // Client Editing States
  const { request, setRequest } = useClientContext();

  // Hook to fetch client by ID
  const { fetchClient } = useFetchClient();
  // Hook to create client
  const { createClient } = useCreateClient();
  // Hook to update client
  const { updateClient } = useUpdateClient();

  // Dialog Handler
  const handler = () => {
    setDialog({ ...dialog, form: false });
  };

  // Handle change function
  const handleChange = (
    key: string,
    value: string | number | boolean | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update the Client request state
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
    console.log("Client Request", request);
    if (ID.update) {
      // Update the client
      updateClient(ID.update, request);
    } else {
      // Create the client
      createClient(request);
    }
  };

  // UseEffect to fetch the client by ID
  React.useEffect(() => {
    if (ID.update) {
      fetchClient(ID.update);
    }
  }, [ID.update]);

  return (
    <>
      <Dialog
        size="md"
        open={dialog.form}
        handler={handler}
        className="bg-transparent shadow-none "
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
                  {ID.update ? "Update Client" : "Create Client"}
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
                    ? "Update the client details"
                    : "Fill in the client details"}
                </Typography>
                <DefaultInput
                  label="Client First Name"
                  placeholder="Enter the Client First Name"
                  value={request.firstName}
                  error={getError("firstName")}
                  smallMessage="Your client first name will be unique"
                  onChange={(e) => handleChange("firstName", e.target.value)}
                />
                {/* Last Name */}
                <DefaultInput
                  label="Client Last Name"
                  placeholder="Enter the Client Last Name"
                  value={request.lastName}
                  error={getError("lastName")}
                  smallMessage="Your client last name will be unique"
                  onChange={(e) => handleChange("lastName", e.target.value)}
                />
                {/* Email */}
                <DefaultInput
                  label="Client Email"
                  placeholder="Enter the Client Email"
                  value={request.email}
                  error={getError("email")}
                  smallMessage="Your client email will be unique"
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {/* Phone */}
                <DefaultInput
                  label="Client Phone"
                  placeholder="Enter the Client Phone"
                  value={request.phone}
                  error={getError("phone")}
                  smallMessage="Your client phone will be unique"
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                {/* Address */}
                <DefaultInput
                  label="Client Address"
                  placeholder="Enter the Client Address"
                  value={request.address}
                  error={getError("address")}
                  smallMessage="Your client address will be unique"
                  onChange={(e) => handleChange("address", e.target.value)}
                />
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
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  color="green"
                >
                  {ID.update ? "Update Client" : "Create Client"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
};
