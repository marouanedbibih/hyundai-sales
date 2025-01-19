"use client";
import { DynamicAlert } from "@/components/Alert/DynamicAlert";
import {
  IDialog,
  IFetching,
  IID,
  ILoading,
  IMessage,
  IPagination,
  MessageType,
  MyError,
} from "@/types";
import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the type for the context state
interface GlobalContextProps {
  // Alert state
  alertOpen: boolean;
  setAlertOpen: (open: boolean) => void;
  // Message state
  message: IMessage;
  setMessage: (message: IMessage) => void;
  // Loading state
  loading: ILoading;
  setLoading: (loading: ILoading) => void;
  // Fetching state
  fetching: IFetching;
  setFetching: (fetching: IFetching) => void;
  // Dialog state
  dialog: IDialog;
  setDialog: (dialog: IDialog) => void;
  // Pagination state
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
  // ID state
  ID: IID;
  setID: (id: IID) => void;
  // Errors state
  errors: MyError[];
  setErrors: (errors: MyError[]) => void;
  initErrors: () => void;


}

// Create the context
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Define the provider component
const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Alert state
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  // Message state
  const [message, setMessage] = useState<IMessage>({
    message: "",
    type: MessageType.INIT,
  });
  // Loading state
  const [loading, setLoading] = useState<ILoading>({
    table: false,
    form: false,
    filter: false,
    delete: false,
  });
  // Fetching state
  const [fetching, setFetching] = useState<IFetching>({
    normal: true,
    search: false,
    filter: false,
  });
  // Dialog state
  const [dialog, setDialog] = useState<IDialog>({
    form: false,
    delete: false,
    filter: false,
  });
  // Pagination state
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
    size: 5,
    initPagination: () => {
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalElements: 0,
        size: 5,
        initPagination: pagination.initPagination,
      });
    },
  });
  // ID state
  const [ID, setID] = useState<IID>({
    delete: null,
    update: null,
    fetch: null,
  });
  // Errors state
  const [errors, setErrors] = useState<MyError[]>([]);
  const initErrors = () => {
    setErrors([]);
  };


  return (
    <GlobalContext.Provider
      value={{
        // Alert state
        alertOpen,
        setAlertOpen,
        // Message state
        message,
        setMessage,
        // Loading state
        loading,
        setLoading,
        // Fetching state
        fetching,
        setFetching,
        // Dialog state
        dialog,
        setDialog,
        // Pagination state
        pagination,
        setPagination,
        // ID state
        ID,
        setID,
        // Errors state
        errors,
        setErrors,
        initErrors,

      }}
    >
      {children}

      {message && message.type !== MessageType.INIT && (
        <DynamicAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          title={message.type?.toString()}
          message={message.message ?? ""}
          type={message.type}
        />
      )}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export { GlobalProvider };
