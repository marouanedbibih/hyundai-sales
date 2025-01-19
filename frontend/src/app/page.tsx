/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { IAuthRequest } from "@/types/auth";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { MessageType, MyError,MyResponse } from "@/types";
import { DefaultInput } from "@/components/Input/DefaultInput";
import { useLocalStorageContext } from "@/contexts/LocalStorageProvider";
import { loginAPI } from "@/services/AuthService";

const Login: React.FC = () => {
  // Auth request local state
  const [authRequest, setAuthRequest] = useState<IAuthRequest>({
    username: "",
    password: "",
  });

  // Token state provider context
  const {
    setTokenInLocalStorage,
    getTokenFromLocalStorage,
    setRoleInLocalStorage,
    getRoleFromLocalStorage,
  } = useLocalStorageContext();

  // Global context provider
  const { setMessage, setAlertOpen } = useGlobalContext();

  // Field error state
  const [errors, setErrors] = useState<MyError[]>([]);

  // Next.js router for navigation
  const router = useRouter();

  // Check for token and role on component mount
  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    const storedRole = getRoleFromLocalStorage();
    if (storedToken && storedRole) {
      router.push("/client");
    }
  }, [router, getTokenFromLocalStorage, getRoleFromLocalStorage]);

  // Function to get the error message for a specific field
  const getError = (key: string) => {
    const input = errors.find((error) => error.key === key);
    return input ? input.message : "";
  };

  // Handle change function
  const handleChange = (
    key: string,
    value: string | number | boolean | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Update the employee request state
    setAuthRequest({ ...authRequest, [key]: value });
    // Clear the error for this field if any
    setErrors(errors.filter((error) => error.key !== key));
  };

  const handleLogin = async () => {
    try {
      const res: MyResponse = await loginAPI(authRequest);
      console.log(res);
      // Set token and role in localStorage
      setTokenInLocalStorage(res.data.token);
      setRoleInLocalStorage(res.data.role);
      router.push("/profile");
    } catch (err: any) {
      console.log(err);
      setMessage({
        message: err.message,
        type: MessageType.ERROR,
      });
      setAlertOpen(true);
      if (err.errors) {
        setErrors(err.errors);
      }
    } finally {
      console.log("finally");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-gray-50 w-full h-screen p-4 gap-4">
      <Card
        className="p-4"
        shadow={false}
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
          Login
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Nice to meet you! Enter your details to Login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <DefaultInput
              label="Username"
              placeholder="Enter your username"
              error={getError("username")}
              onChange={(e) => handleChange("username", e.target.value)}
              smallMessage="Enter your username"
              value={authRequest.username}
            />
            <DefaultInput
              label="Password"
              placeholder="Enter your password"
              error={getError("password")}
              onChange={(e) => handleChange("password", e.target.value)}
              smallMessage="Enter your password"
              value={authRequest.password}
              type="password"
            />
          </div>

          <Button
            className="mt-6"
            fullWidth
            onClick={handleLogin}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
