/* eslint-disable react-hooks/exhaustive-deps */
import { useVehicleContext } from "@/contexts/VehicleProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import {
    createVehicleAPI,
    deleteVehicleAPI,
    fetchVehicleAPI,
    fetchListOfVehiclesAPI,
    searchVehiclesAPI,
    updateVehicleAPI
} from "@/services/VehicleService";
import { MessageType, MyErrorResponse, MyResponse } from "@/types";
import { IVehicleRequest } from "@/types/vehicle";
import React from "react";

// Fetch the list of vehicles
export const useFetchListOfVehicles = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setData } = useVehicleContext();

    const fetchListOfVehicles = async (page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        fetchListOfVehiclesAPI(page, size)
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
            fetchListOfVehicles(pagination.currentPage, pagination.size);
        }
    }, [fetching.normal, pagination.currentPage, pagination.size]);

    return { fetchListOfVehicles };
}

// Search vehicles
export const useSearchVehicles = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching, setFetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setData, searchKeyword, setSearchKeyword } = useVehicleContext();

    const searchVehicles = async (keyword: string, page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        searchVehiclesAPI(keyword, page, size)
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
            searchVehicles(searchKeyword, pagination.currentPage, pagination.size);
        }
    }, [fetching.search, searchKeyword, pagination.currentPage, pagination.size]);

    return { searchVehicles, setSearchKeyword, setFetching, pagination };
}

// Fetch a single vehicle
export const useFetchVehicle = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setRequest } = useVehicleContext();

    const fetchVehicle = async (id: number) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        fetchVehicleAPI(id)
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

    return { fetchVehicle };
}

// Create a new vehicle
export const useCreateVehicle = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { initRequest } = useVehicleContext();
    const { reFetchData } = useReFetchData();

    const createVehicle = async (request: IVehicleRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        createVehicleAPI(request)
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

    return { createVehicle };
}

// Update a vehicle
export const useUpdateVehicle = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    const { initRequest } = useVehicleContext();
    const { reFetchData } = useReFetchData();

    const updateVehicle = async (id: number, request: IVehicleRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        updateVehicleAPI(id, request)
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

    return { updateVehicle };
}

// Delete a vehicle
export const useDeleteVehicle = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    const { reFetchData } = useReFetchData();

    const deleteVehicle = async (id: number) => {
        setLoading({ ...loading, table: false, form: false, filter: false });
        deleteVehicleAPI(id)
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

    return { deleteVehicle };
}

// Refetch Data
export const useReFetchData = () => {
    const { fetchListOfVehicles } = useFetchListOfVehicles();
    const { searchVehicles } = useSearchVehicles();
    const { fetching } = useGlobalContext();
    const { pagination } = useGlobalContext();
    const { searchKeyword } = useVehicleContext();

    const reFetchData = () => {
        if (fetching.normal) {
            fetchListOfVehicles(pagination.currentPage, pagination.size);
        } else if (fetching.search) {
            searchVehicles(searchKeyword, pagination.currentPage, pagination.size);
        }
    };

    return { reFetchData };
}
