/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/axios/axiosClient";
import { MyResponse } from "@/types";
import { ISaleRequest, IUpdateSaleRequest} from "@/types/sale"; 

// Fetch list of sales with pagination
export const fetchListOfSalesAPI = async (page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/sales?page=${page}&size=${size}`);
        console.log("Sales List data: ", data);
        return data;
    } catch (error: any) {
        console.error("Error fetching sales list: ", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

// Search sales by keyword
export const searchSalesAPI = async (keyword: string, page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/sales/search?keyword=${keyword}&page=${page}&size=${size}`);
        console.log("Sales Search data: ", data);
        return data;
    } catch (error: any) {
        console.error("Error searching sales: ", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

// Fetch a single sale by ID
export const fetchSaleAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/sale/${id}`);
        return data;
    } catch (error: any) {
        console.error("Error fetching sale: ", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

// Create a new sale
export const createSaleAPI = async (payload: ISaleRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/sale`, payload);
        return data;
    } catch (error: any) {
        console.error("Error creating sale: ", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

// Update an existing sale
export const updateSaleAPI = async (id: number, payload: IUpdateSaleRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/v1/sale/${id}`, payload);
        return data;
    } catch (error: any) {
        console.error("Error updating sale: ", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};

// Delete a sale
export const deleteSaleAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/sale/${id}`);
        return data;
    } catch (error: any) {
        console.error("Error deleting sale: ", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};
