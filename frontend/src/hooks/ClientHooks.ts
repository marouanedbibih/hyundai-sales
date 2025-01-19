/* eslint-disable react-hooks/exhaustive-deps */
import { useClientContext } from "@/contexts/ClientProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import {
    createClientAPI,
    deleteClientAPI,
    fetchClientAPI,
    fetchListOfClientsAPI,
    searchClientsAPI,
    updateClientAPI
} from "@/services/ClientService";
import { MessageType, MyErrorResponse, MyResponse } from "@/types";
import { IClientRequest } from "@/types/client";
import React from "react";

// Fetch the list of clients
export const useFetchListOfClients = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setData } = useClientContext();

    const fetchListOfClients = async (page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        fetchListOfClientsAPI(page, size)
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
            fetchListOfClients(pagination.currentPage, pagination.size);
        }
    }, [fetching.normal, pagination.currentPage, pagination.size]);

    return { fetchListOfClients };
}

// Search clients
export const useSearchClients = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching, setFetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setData, searchKeyword, setSearchKeyword } = useClientContext();

    const searchClients = async (keyword: string, page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        searchClientsAPI(keyword, page, size)
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
            searchClients(searchKeyword, pagination.currentPage, pagination.size);
        }
    }, [fetching.search, searchKeyword, pagination.currentPage, pagination.size]);

    return { searchClients, setSearchKeyword, setFetching, pagination };
}

// Fetch a single client
export const useFetchClient = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setRequest } = useClientContext();

    const fetchClient = async (id: number) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        fetchClientAPI(id)
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

    return { fetchClient };
}

// Create a new client
export const useCreateClient = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { initRequest } = useClientContext();
    const { reFetchData } = useReFetchData();

    const createClient = async (request: IClientRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        createClientAPI(request)
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

    return { createClient };
}

// Update a client
export const useUpdateClient = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    const { initRequest } = useClientContext();
    const { reFetchData } = useReFetchData();

    const updateClient = async (id: number, request: IClientRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        updateClientAPI(id, request)
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

    return { updateClient };
}

// Delete a client
export const useDeleteClient = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    const { reFetchData } = useReFetchData();

    const deleteClient = async (id: number) => {
        setLoading({ ...loading, table: false, form: false, filter: false });
        deleteClientAPI(id)
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

    return { deleteClient };
}

// Refetch Data
export const useReFetchData = () => {
    const { fetchListOfClients } = useFetchListOfClients();
    const { searchClients } = useSearchClients();
    const { fetching } = useGlobalContext();
    const { pagination } = useGlobalContext();
    const { searchKeyword } = useClientContext();

    const reFetchData = () => {
        if (fetching.normal) {
            fetchListOfClients(pagination.currentPage, pagination.size);
        } else if (fetching.search) {
            searchClients(searchKeyword, pagination.currentPage, pagination.size);
        }
    };

    return { reFetchData };
}
