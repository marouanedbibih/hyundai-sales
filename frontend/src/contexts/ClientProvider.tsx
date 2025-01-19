import React, { createContext, useState, ReactNode, useContext } from "react";
import { IClient, IClientRequest } from "@/types/client"; // Assuming you have a Client type/interface defined

// Define the type for the context state
interface ClientContextProps {
  data: IClient[] | null;
  setData: (data: IClient[] | null) => void;
  request: IClientRequest;
  setRequest: (request: IClientRequest) => void;
  initRequest: () => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
  client: IClient | null;
  setClient: (client: IClient | null) => void;
}

// Create the context
const ClientContext = createContext<ClientContextProps | undefined>(undefined);

// Define the provider component
const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data state
  const [data, setData] = useState<IClient[] | null>(null);

  // Request state
  const [request, setRequest] = useState<IClientRequest>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const initRequest = () => {
    setRequest({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  // Search keyword state
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  // Client state
  const [client, setClient] = useState<IClient | null>(null);

  return (
    <ClientContext.Provider
      value={{
        data,
        setData,
        request,
        setRequest,
        initRequest,
        searchKeyword,
        setSearchKeyword,
        client,
        setClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

// Custom hook to use the context
export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};

export { ClientProvider };
