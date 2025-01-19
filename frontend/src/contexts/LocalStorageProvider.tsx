"use client";

import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";

// Define the type for the user context state
interface LocalStorageContextProps {
  // Token state
  token: string | null;
  setTokenInLocalStorage: (token: string) => void;
  getTokenFromLocalStorage: () => string | null;
  removeTokenFromLocalStorage: () => void;

  // Role state
  role: string | null;
  setRoleInLocalStorage: (role: string) => void;
  getRoleFromLocalStorage: () => string | null;
  removeRoleFromLocalStorage: () => void;

}

// Create the context
const LocalStorageContext = createContext<LocalStorageContextProps | undefined>(undefined);

// Define the provider component
const LocalStorageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Token handlers
  const setTokenInLocalStorage = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  const removeTokenFromLocalStorage = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Role handlers
  const setRoleInLocalStorage = (newRole: string) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  const getRoleFromLocalStorage = () => {
    return localStorage.getItem("role");
  };

  const removeRoleFromLocalStorage = () => {
    setRole(null);
    localStorage.removeItem("role");
  };



  // Load initial values from localStorage on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);

    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);

  }, []);

  return (
    <LocalStorageContext.Provider
      value={{
        token,
        setTokenInLocalStorage,
        getTokenFromLocalStorage,
        removeTokenFromLocalStorage,
        role,
        setRoleInLocalStorage,
        getRoleFromLocalStorage,
        removeRoleFromLocalStorage,

      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

// Custom hook to use the LocalStorage context
export const useLocalStorageContext = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error("useLocalStorageContext must be used within a LocalStorageProvider");
  }
  return context;
};

export { LocalStorageProvider };
