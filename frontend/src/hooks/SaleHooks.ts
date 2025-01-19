/* eslint-disable react-hooks/exhaustive-deps */
import { useGlobalContext } from "@/contexts/GlobalProvider";
import { useSaleContext } from "@/contexts/SaleProvider";
import {
    fetchListOfSalesAPI,
    searchSalesAPI,
    fetchSaleAPI,
    createSaleAPI,
    updateSaleAPI,
    deleteSaleAPI
} from "@/services/SaleService";
import { MessageType, MyErrorResponse, MyResponse } from "@/types";
import { ISaleRequest, IUpdateSaleRequest } from "@/types/sale";
import React from "react";

// Fetch the list of sales
export const useFetchListOfSales = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setSalesData } = useSaleContext();

    const fetchListOfSales = async (page: number, size: number) => {
        setLoading({ ...loading, table: true });
        fetchListOfSalesAPI(page, size)
            .then((res: MyResponse) => {
                setSalesData(res.data);
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
                setLoading({ ...loading, table: false });
            });
    };

    React.useEffect(() => {
        if (fetching.normal) {
            fetchListOfSales(pagination.currentPage, pagination.size);
        }
    }, [fetching.normal,pagination.currentPage, pagination.size]);

    return { fetchListOfSales };
}

// Search sales
export const useSearchSales = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { fetching,setFetching } = useGlobalContext();
    const { setPagination, pagination } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setSalesData, searchKeyword, setSearchKeyword } = useSaleContext();

    const searchSales = async (keyword: string, page: number, size: number) => {
        setLoading({ ...loading, table: true });
        searchSalesAPI(keyword, page, size)
            .then((res: MyResponse) => {
                if (res.data) {
                    setSalesData(res.data);
                    setPagination({
                        ...pagination,
                        currentPage: res.meta.currentPage,
                        totalPages: res.meta.totalPages,
                        totalElements: res.meta.totalElements,
                        size: res.meta.size,
                    });
                } else {
                    setSalesData(null);
                    setPagination({ ...pagination, currentPage: 0, totalPages: 0, totalElements: 0 });
                }
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false });
            });
    };

    React.useEffect(() => {
        if (searchKeyword) {
            searchSales(searchKeyword, pagination.currentPage, pagination.size);
        }
    }, [fetching.search,searchKeyword, pagination.currentPage, pagination.size]);

    return { searchSales, setSearchKeyword, setFetching, pagination };
}

// Fetch a single sale
export const useFetchSale = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { setUpdateSaleRequest } = useSaleContext();

    const fetchSale = async (id: number) => {
        setLoading({ ...loading, form: true });
        fetchSaleAPI(id)
            .then((res: MyResponse) => {
                setUpdateSaleRequest(res.data);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    return { fetchSale };
}

// Create a new sale
export const useCreateSale = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { initSaleRequest } = useSaleContext();
    const { setErrors } = useGlobalContext();
    const { reFetchData } = useReFetchData();

    const createSale = async (request: ISaleRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        createSaleAPI(request)
            .then((res: MyResponse) => {
                setDialog({ ...dialog, form: false, delete: false, filter: false });
                reFetchData();
                initSaleRequest();
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setErrors(err.errors);
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    return { createSale };
}

// Update a sale
export const useUpdateSale = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { initUpdateSaleRequest, } = useSaleContext();
    const { ID, setID } = useGlobalContext();
    const { setErrors } = useGlobalContext();


    const { reFetchData } = useReFetchData();

    const updateSale = async (id: number, request: IUpdateSaleRequest) => {
        setLoading({ ...loading, table: false, form: true, filter: false });
        updateSaleAPI(id, request)
            .then((res: MyResponse) => {
                setID({ ...ID, update: null });
                setDialog({ ...dialog, form: false, delete: false, filter: false });
                initUpdateSaleRequest();
                reFetchData();
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
                setErrors(err.errors);
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    return { updateSale };
}

// Delete a sale
export const useDeleteSale = () => {
    const { setAlertOpen, setMessage } = useGlobalContext();
    const { setLoading, loading } = useGlobalContext();
    const { dialog, setDialog } = useGlobalContext();
    const { setID,ID } = useGlobalContext();
    const { reFetchData } = useReFetchData();

    const deleteSale = async (id: number) => {
        setLoading({ ...loading, table: true, form: false, filter: false });
        deleteSaleAPI(id)
            .then((res: MyResponse) => {
                reFetchData();
                setDialog({ ...dialog, delete: false });
                setID({ ...ID, delete: null });
                setMessage({ message: res.message, type: MessageType.INFO });
                setAlertOpen(true);
            })
            .catch((err: MyErrorResponse) => {
                setMessage({ message: err.message, type: MessageType.ERROR });
            })
            .finally(() => {
                setLoading({ ...loading, table: false });
            });
    };

    return { deleteSale };
}

// Refetch Data
export const useReFetchData = () => {
    const { fetchListOfSales } = useFetchListOfSales();
    const { searchSales } = useSearchSales();
    const { pagination } = useGlobalContext();
    const { searchKeyword } = useSaleContext();

    const reFetchData = () => {
        if (searchKeyword) {
            searchSales(searchKeyword, pagination.currentPage, pagination.size);
        } else {
            fetchListOfSales(pagination.currentPage, pagination.size);
        }
    };

    return { reFetchData };
}
