import React, { createContext, useState, ReactNode, useContext } from "react";
import { IVehicle, IVehicleRequest, VehicleStatus } from "@/types/vehicle"; // Assuming you have a Vehicle type/interface defined

// Define the type for the context state
interface VehicleContextProps {
  data: IVehicle[] | null;
  setData: (data: IVehicle[] | null) => void;
  request: IVehicleRequest;
  setRequest: (request: IVehicleRequest) => void;
  initRequest: () => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
  vehicle: IVehicle | null;
  setVehicle: (vehicle: IVehicle | null) => void;
}

// Create the context
const VehicleContext = createContext<VehicleContextProps | undefined>(undefined);

// Define the provider component
const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data state
  const [data, setData] = useState<IVehicle[] | null>(null);

  // Request state
  const [request, setRequest] = useState<IVehicleRequest>({
    model: "",
    year: undefined,
    price: undefined,
    color: "",
    status: VehicleStatus.AVAILABLE, // Default status
    isPromotion: false,
    discount: undefined,
  });

  // Initialize request state
  const initRequest = () => {
    setRequest({
      model: "",
      year: undefined,
      price: undefined,
      color: "",
      status: VehicleStatus.AVAILABLE,
      isPromotion: false,
      discount: undefined,
    });
  };

  // Search keyword state
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  // Vehicle state
  const [vehicle, setVehicle] = useState<IVehicle | null>(null);

  return (
    <VehicleContext.Provider
      value={{
        data,
        setData,
        request,
        setRequest,
        initRequest,
        searchKeyword,
        setSearchKeyword,
        vehicle,
        setVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

// Custom hook to use the context
export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicleContext must be used within a VehicleProvider");
  }
  return context;
};

export { VehicleProvider };
