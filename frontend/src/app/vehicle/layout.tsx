/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { DefaultNavbar } from "@/components/Navbar/DefaultNavbar";
import { SideBar } from "@/components/Sidebar/SideBar";
import { useLocalStorageContext } from "@/contexts/LocalStorageProvider";
import { VehicleProvider } from "@/contexts/VehicleProvider";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function VehicleLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { getRoleFromLocalStorage, getTokenFromLocalStorage } =
    useLocalStorageContext();
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState<string | null>(null);
  const [role, setRole] = React.useState<string | null>(null);
  const router = useRouter(); // Hook for navigation

  React.useEffect(() => {
    // Fetch token and role from localStorage on the client side
    const fetchedToken = getTokenFromLocalStorage();
    const fetchedRole = getRoleFromLocalStorage();

    setToken(fetchedToken);
    setRole(fetchedRole);

    // Check if the user is authorized
    const isAuthorized =
      fetchedToken &&
      (fetchedRole === "ADMIN" ||
        fetchedRole === "SELLER" ||
        fetchedRole === "AFFTER_SALES_MANAGER");

    if (!isAuthorized) {
      router.push("/"); // Redirect to login page or another appropriate page
    } else {
      setLoading(false); // Stop loading once the authorization check is complete
    }
  }, [getRoleFromLocalStorage, getTokenFromLocalStorage, router]);

  // Show a loading state while checking authorization
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen min-w-full">
        <Spinner
          className="w-16 h-16"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen py-4 pl-4 bg-blue-gray-50 w-full">
      <SideBar />
      <main className="flex-1 ml-[20rem] px-16 gap-8">
        <div className="mb-8 w-full">
          <DefaultNavbar />
        </div>
        <VehicleProvider>{children}</VehicleProvider>
      </main>
    </div>
  );
}
