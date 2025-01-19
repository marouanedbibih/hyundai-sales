import React, { createContext, useState, ReactNode, useContext } from "react";
import {
  IAffterSale,
  ICreateAffterSaleRequest,
  IUpdateAffterSaleRequest,
  AffterSaleStatus,
  AffterSaleType,
} from "@/types/affterSale"; // Assuming you have these types defined

// Define the type for the context state
interface AffterSaleContextProps {
  data: IAffterSale[] | null;
  setData: (data: IAffterSale[] | null) => void;
  createRequest: ICreateAffterSaleRequest;
  setCreateRequest: (request: ICreateAffterSaleRequest) => void;
  updateRequest: IUpdateAffterSaleRequest;
  setUpdateRequest: (request: IUpdateAffterSaleRequest) => void;
  initCreateRequest: () => void;
  initUpdateRequest: () => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
  affterSale: IAffterSale | null;
  setAffterSale: (affterSale: IAffterSale | null) => void;
}

// Create the context
const AffterSaleContext = createContext<AffterSaleContextProps | undefined>(undefined);

// Define the provider component
const AffterSaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data state
  const [data, setData] = useState<IAffterSale[] | null>(null);

  // Create Request state for creating a new AffterSale
  const [createRequest, setCreateRequest] = useState<ICreateAffterSaleRequest>({
    type: AffterSaleType.REPAIR, 
    description: "",
    cost: 0,
    appointment: "",
    status: AffterSaleStatus.SCHEUDLED, 
    vehicleId: 0,
    clientId: 0,
  });

  // Initialize the create request to default values
  const initCreateRequest = () => {
    setCreateRequest({
      type: AffterSaleType.REPAIR,
      description: "",
      cost: 0,
      appointment: "",
      status: AffterSaleStatus.SCHEUDLED,
      vehicleId: 0,
      clientId: 0,
    });
  };

  // Update Request state for updating an existing AffterSale
  const [updateRequest, setUpdateRequest] = useState<IUpdateAffterSaleRequest>({
    type: AffterSaleType.REPAIR,
    description: "",
    cost: 0,
    appointment: "",
    status: AffterSaleStatus.SCHEUDLED,
  });

  // Initialize the update request with existing affterSale data
  const initUpdateRequest = () => {
    setUpdateRequest({
        type: AffterSaleType.REPAIR,
        description: "",
        cost: 0,
        appointment: "",
        status: AffterSaleStatus.SCHEUDLED,
    });
  };

  // Search keyword state
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Single affterSale state
  const [affterSale, setAffterSale] = useState<IAffterSale | null>(null);

  return (
    <AffterSaleContext.Provider
      value={{
        data,
        setData,
        createRequest,
        setCreateRequest,
        updateRequest,
        setUpdateRequest,
        initCreateRequest,
        initUpdateRequest,
        searchKeyword,
        setSearchKeyword,
        affterSale,
        setAffterSale,
      }}
    >
      {children}
    </AffterSaleContext.Provider>
  );
};

// Custom hook to use the context
export const useAffterSaleContext = () => {
  const context = useContext(AffterSaleContext);
  if (!context) {
    throw new Error("useAffterSaleContext must be used within an AffterSaleProvider");
  }
  return context;
};

export { AffterSaleProvider };
