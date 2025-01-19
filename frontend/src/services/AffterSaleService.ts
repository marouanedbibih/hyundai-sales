/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/axios/axiosClient";
import { MyResponse } from "@/types"; // Assuming you have MyResponse type defined
import { ICreateAffterSaleRequest, IUpdateAffterSaleRequest } from "@/types/affterSale"; // Assuming you have these request types defined

// Fetch list of after-sales services
export const fetchListOfAffterSalesAPI = async (page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/affter-sales?page=${page}&size=${size}`);
        console.log("Affter Sales List data: ", data);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Search after-sales services
export const searchAffterSalesAPI = async (keyword: string, page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/affter-sales/search?keyword=${keyword}&page=${page}&size=${size}`);
        console.log("Affter Sales Search data: ", data);
        return data;
    } catch (error: any) {
        console.log("Affter Sales Search error: ", error.response.data);
        throw error.response.data;
    }
};

// Fetch a single after-sales service by ID
export const fetchAffterSaleAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/affter-sale/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Create a new after-sales service
export const createAffterSaleAPI = async (payload: ICreateAffterSaleRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/affter-sale`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Update an existing after-sales service
export const updateAffterSaleAPI = async (id: number, payload: IUpdateAffterSaleRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/v1/affter-sale/${id}`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Delete an after-sales service
export const deleteAffterSaleAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/affter-sale/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
};
