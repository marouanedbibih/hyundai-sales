import React, { createContext, useState, ReactNode, useContext } from "react";
import {
  ISale,
  ISaleRequest,
  IUpdateSaleRequest,
  PaymentMethod,
} from "@/types/sale"; // Ensure correct path to types

// Define the type for the context state
interface SaleContextProps {
  salesData: ISale[] | null;
  setSalesData: (salesData: ISale[] | null) => void;
  // Sale request state
  saleRequest: ISaleRequest;
  setSaleRequest: (saleRequest: ISaleRequest) => void;
  initSaleRequest: () => void;
  // Update sale request state
  updateSaleRequest: IUpdateSaleRequest;
  setUpdateSaleRequest: (updateSaleRequest: IUpdateSaleRequest) => void;
  initUpdateSaleRequest: () => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
  selectedSale: ISale | null;
  setSelectedSale: (selectedSale: ISale | null) => void;
}

// Create the context
const SaleContext = createContext<SaleContextProps | undefined>(undefined);

// Define the provider component
const SaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Sales data state
  const [salesData, setSalesData] = useState<ISale[] | null>(null);

  // Sale request state
  const [saleRequest, setSaleRequest] = useState<ISaleRequest>({
    clientId: 0,
    vehicleId: 0,
    totalPrice: 0,
    paymentMethod: PaymentMethod.FULL, // default payment method or change as needed
    installments: null,
  });

  const initSaleRequest = () => {
    setSaleRequest({
      clientId: 0,
      vehicleId: 0,
      totalPrice: 0,
      paymentMethod: PaymentMethod.FULL, // Reset to default payment method or customize it as needed
      installments: null,
    });
  };

  // Search keyword state
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Selected sale state
  const [selectedSale, setSelectedSale] = useState<ISale | null>(null);

  // Update sale request state
    const [updateSaleRequest, setUpdateSaleRequest] = useState<IUpdateSaleRequest>({
        totalPrice: 0,
        paymentMethod: PaymentMethod.FULL, 
        installments: null,
    });
    const initUpdateSaleRequest = () => {
        setUpdateSaleRequest({
            totalPrice: 0,
            paymentMethod: PaymentMethod.FULL, 
            installments: null,
        });
    }

  return (
    <SaleContext.Provider
      value={{
        salesData,
        setSalesData,
        saleRequest,
        setSaleRequest,
        initSaleRequest,
        searchKeyword,
        setSearchKeyword,
        selectedSale,
        setSelectedSale,
        updateSaleRequest,
        setUpdateSaleRequest,
        initUpdateSaleRequest,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};

// Custom hook to use the context
export const useSaleContext = () => {
  const context = useContext(SaleContext);
  if (!context) {
    throw new Error("useSaleContext must be used within a SaleProvider");
  }
  return context;
};

export { SaleProvider };
