/* eslint-disable react-hooks/exhaustive-deps */
import { useAffterSaleContext } from "@/contexts/AffterSaleProvider";
import { useGlobalContext } from "@/contexts/GlobalProvider";
import {
    createAffterSaleAPI,
    deleteAffterSaleAPI,
    fetchAffterSaleAPI,
    fetchListOfAffterSalesAPI,
    searchAffterSalesAPI,
    updateAffterSaleAPI
} from "@/services/AffterSaleService";
import { MessageType, MyErrorResponse, MyResponse } from "@/types";
import { ICreateAffterSaleRequest, IUpdateAffterSaleRequest } from "@/types/affterSale";
import React from "react";

// Fetch the list of after-sales
export const useFetchListOfAffterSales = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setData } = useAffterSaleContext();

    const fetchListOfAffterSales = async (page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        fetchListOfAffterSalesAPI(page, size)
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
            fetchListOfAffterSales(pagination.currentPage, pagination.size);
        }
    }, [fetching.normal, pagination.currentPage, pagination.size]);

    return { fetchListOfAffterSales };
}

// Search after-sales
export const useSearchAffterSales = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching, setFetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setData, searchKeyword, setSearchKeyword } = useAffterSaleContext();

    const searchAffterSales = async (keyword: string, page: number, size: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        searchAffterSalesAPI(keyword, page, size)
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
            searchAffterSales(searchKeyword, pagination.currentPage, pagination.size);
        }
    }, [fetching.search, searchKeyword, pagination.currentPage, pagination.size]);

    return { searchAffterSales, setSearchKeyword, setFetching, pagination };
}

// Fetch a single after-sale
export const useFetchAffterSale = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setUpdateRequest } = useAffterSaleContext();

    const fetchAffterSale = async (id: number) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        fetchAffterSaleAPI(id)
            .then((res: MyResponse) => {
                setUpdateRequest({
                    type: res.data.type,
                    description: res.data.description,
                    cost: res.data.cost,
                    appointment: res.data.appointment,
                    status: res.data.status,
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

    return { fetchAffterSale };
}

// Create a new after-sale
export const useCreateAffterSale = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { initCreateRequest } = useAffterSaleContext();
    const { reFetchData } = useReFetchData();

    const createAffterSale = async (request: ICreateAffterSaleRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        createAffterSaleAPI(request)
            .then((res: MyResponse) => {
                setDialog({ ...dialog, form: false, delete: false, filter: false });
                initCreateRequest();
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

    return { createAffterSale };
}

// Update an after-sale
export const useUpdateAffterSale = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setErrors } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    const { initUpdateRequest } = useAffterSaleContext();
    const { reFetchData } = useReFetchData();

    const updateAffterSale = async (id: number, request: IUpdateAffterSaleRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        updateAffterSaleAPI(id, request)
            .then((res: MyResponse) => {
                setID({ ...ID, update: null });
                setDialog({ ...dialog, form: false, delete: false, filter: false });
                initUpdateRequest();
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

    return { updateAffterSale };
}

// Delete an after-sale
export const useDeleteAffterSale = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { ID, setID } = useGlobalContext();
    const { reFetchData } = useReFetchData();

    const deleteAffterSale = async (id: number) => {
        setLoading({ ...loading, table: false, form: false, filter: false });
        deleteAffterSaleAPI(id)
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

    return { deleteAffterSale };
}

// Refetch Data
export const useReFetchData = () => {
    const { fetchListOfAffterSales } = useFetchListOfAffterSales();
    const { searchAffterSales } = useSearchAffterSales();
    const { fetching } = useGlobalContext();
    const { pagination } = useGlobalContext();
    const { searchKeyword } = useAffterSaleContext();

    const reFetchData = () => {
        if (fetching.normal) {
            fetchListOfAffterSales(pagination.currentPage, pagination.size);
        } else if (fetching.search) {
            searchAffterSales(searchKeyword, pagination.currentPage, pagination.size);
        }
    };

    return { reFetchData };
}
