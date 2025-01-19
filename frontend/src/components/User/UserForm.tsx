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
import { useUserContext } from "@/contexts/UserProvider";
import { useCreateUser, useFetchUser, useUpdateUser } from "@/hooks/UserHooks";
import { DefaultInput } from "../Input/DefaultInput";
import DefaultSelect from "../Input/DefaultSelect";

interface UserFormProps {}
export const UserForm: React.FC<UserFormProps> = ({}) => {
  // Basic States
  const { dialog, setDialog } = useGlobalContext();
  const { loading } = useGlobalContext();
  const { ID } = useGlobalContext();
  const { errors, setErrors } = useGlobalContext();
  // User Editing States
  const { request, setRequest } = useUserContext();

  // Hook to fetch user by ID
  const { fetchUser } = useFetchUser();
  // Hook to create user
  const { createUser } = useCreateUser();
  // Hook to update user
  const { updateUser } = useUpdateUser();

  // Dialog Handler
  const handler = () => {
    setDialog({ ...dialog, form: false });
  };

  // Handle change function
  const handleChange = (
    key: string,
    value: string | number | boolean | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update the User request state
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
    console.log("User Request", request);
    if (ID.update) {
      // Update the user
      updateUser(ID.update, request);
    } else {
      // Create the user
      createUser(request);
    }
  };

  // UseEffect to fetch the user by ID
  React.useEffect(() => {
    if (ID.update) {
      fetchUser(ID.update);
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
                  {ID.update ? "Update User" : "Create User"}
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
                    ? "Update the user details"
                    : "Fill in the user details"}
                </Typography>
                <DefaultInput
                  label="Username"
                  placeholder="Enter the username"
                  value={request.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  error={getError("username")}
                  smallMessage="Your username will be unique"
                />
                <DefaultInput
                  label="Name"
                  placeholder="Enter the name"
                  value={request.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={getError("name")}
                  smallMessage="Your name will be unique"
                />
                {/* Password */}
                <DefaultInput
                  label="Password"
                  placeholder="Enter the password"
                  value={request.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  error={getError("password")}
                  smallMessage="Your password will be unique"
                  type="password"
                />
                <DefaultSelect
                  label="User Role"
                  value={request.role}
                  error={getError("role")}
                  smallMessage="Select the role of the user."
                  options={[
                    { id: "ADMIN", name: "Admin" },
                    {
                      id: "AFFTER_SALES_MANAGER",
                      name: "Affter Sales Manager",
                    },
                    { id: "SELLER", name: "Seller" },
                  ]}
                  onChange={(value) => handleChange("role", value as string)}
                  loading={false}
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
                  {ID.update ? "Update User" : "Create User"}
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </Dialog>
    </>
  );
};
