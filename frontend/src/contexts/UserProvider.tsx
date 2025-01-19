import React, { createContext, useState, ReactNode, useContext } from "react";
import { IUser, IUserRequest, UserRole } from "@/types/user"; // Assuming you have IUser and IUserRequest defined

// Define the type for the context state
interface UserContextProps {
  data: IUser[] | null;
  setData: (data: IUser[] | null) => void;
  request: IUserRequest;
  setRequest: (request: IUserRequest) => void;
  initRequest: () => void;
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Define the provider component
const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Data state
  const [data, setData] = useState<IUser[] | null>(null);

  // Request state
  const [request, setRequest] = useState<IUserRequest>({
    username: "",
    password: "",
    name: "",
    role: UserRole.SELLER, // default role or change as needed
  });

  const initRequest = () => {
    setRequest({
      username: "",
      password: "",
      name: "",
      role: UserRole.SELLER, // Reset to default role or customize it as needed
    });
  };

  // Search keyword state
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // User state
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider
      value={{
        data,
        setData,
        request,
        setRequest,
        initRequest,
        searchKeyword,
        setSearchKeyword,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UsersProvider");
  }
  return context;
};

export { UsersProvider };
