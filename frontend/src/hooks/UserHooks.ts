/* eslint-disable react-hooks/exhaustive-deps */
import { useUserContext } from "@/contexts/UserProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import {
    createUserAPI,
    deleteUserAPI,
    fetchUserAPI,
    fetchListOfUsersAPI,
    searchUsersAPI,
    updateUserAPI
} from "@/services/UserService";
import { MessageType, MyErrorResponse, MyResponse } from "@/types";
import { IUserRequest } from "@/types/user";
import React from "react";

// Fetch the list of users
export const useFetchListOfUsers = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setData } = useUserContext();

    const fetchListOfUsers = async (page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        fetchListOfUsersAPI(page, size)
            .then((res: MyResponse) => {
                res.data ? setData(res.data) : setData(null);
                setPagination({
                    ...pagination,
                    currentPage: res.meta.currentPage,
                    totalPages: res.meta.totalPages,
                    totalElements: res.meta.totalElements,
                    size: res.meta.size,
                });
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    };

    React.useEffect(() => {
        if (fetching.normal) {
            fetchListOfUsers(pagination.currentPage, pagination.size);
        }
    }, [fetching.normal, pagination.currentPage, pagination.size]);

    return { fetchListOfUsers };
}

// Search users
export const useSearchUsers = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching, setFetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setData, searchKeyword, setSearchKeyword } = useUserContext();

    const searchUsers = async (keyword: string, page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        searchUsersAPI(keyword, page, size)
            .then((res: MyResponse) => {
                if (res.data) {
                    setData(res.data);
                    setPagination({
                        ...pagination,
                        currentPage: res.meta.currentPage,
                        totalPages: res.meta.totalPages,
                        totalElements: res.meta.totalElements,
                        size: res.meta.size,
                    });
                } else {
                    setData(null);
                    pagination.initPagination();
                }
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    };

    React.useEffect(() => {
        if (fetching.search) {
            searchUsers(searchKeyword, pagination.currentPage, pagination.size);
        }
    }, [fetching.search, searchKeyword, pagination.currentPage, pagination.size]);

    return { searchUsers, setSearchKeyword, setFetching, pagination };
}

// Fetch a single user
export const useFetchUser = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setRequest } = useUserContext();

    const fetchUser = async (id: number) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        fetchUserAPI(id)
            .then((res: MyResponse) => {
                setRequest(res.data);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    };

    return { fetchUser };
}

// Create a new user
export const useCreateUser = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { initRequest } = useUserContext();
    const { reFetchData } = useReFetchData();

    const createUser = async (request: IUserRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        createUserAPI(request)
            .then((res: MyResponse) => {
                setDialog({ ...dialog, form: false, delete: false, filter: false });
                initRequest();
                reFetchData();
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setErrors(err.errors);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    }

    return { createUser };
}

// Update a user
export const useUpdateUser = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    const { initRequest } = useUserContext();
    const { reFetchData } = useReFetchData();

    const updateUser = async (id: number, request: IUserRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        updateUserAPI(id, request)
            .then((res: MyResponse) => {
                setID({ ...ID, update: null });
                setDialog({ ...dialog, form: false, delete: false, filter: false });
                initRequest();
                reFetchData();
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setErrors(err.errors);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    }

    return { updateUser };
}

// Delete a user
export const useDeleteUser = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    const { reFetchData } = useReFetchData();

    const deleteUser = async (id: number) => {
        setLoading({ ...loading, table: false, form: false, filter: false });
        deleteUserAPI(id)
            .then((res: MyResponse) => {
                setID({ ...ID, delete: null });
                setDialog({ ...dialog, form: false, delete: false, filter: false });
                reFetchData();
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, filter: false });
            });
    }

    return { deleteUser };
}

// Refetch Data
export const useReFetchData = () => {
    const { fetchListOfUsers } = useFetchListOfUsers();
    const { searchUsers } = useSearchUsers();
    const { fetching } = useGlobalContext();
    const { pagination } = useGlobalContext();
    const { searchKeyword } = useUserContext();

    const reFetchData = () => {
        if (fetching.normal) {
            fetchListOfUsers(pagination.currentPage, pagination.size);
        } else if (fetching.search) {
            searchUsers(searchKeyword, pagination.currentPage, pagination.size);
        }
    };

    return { reFetchData };
}
