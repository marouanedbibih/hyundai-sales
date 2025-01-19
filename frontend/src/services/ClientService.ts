/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/axios/axiosClient";
import { MyResponse } from "@/types";
import { IClientRequest } from "@/types/client"; // Assuming you have a `Client` interface

// Fetch list of clients
export const fetchListOfClientsAPI = async (page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/clients?page=${page}&size=${size}`);
        console.log("Clients List data: ", data);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Search clients
export const searchClientsAPI = async (keyword: string, page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/clients/search?keyword=${keyword}&page=${page}&size=${size}`);
        console.log("Clients List data: ", data);
        return data;
    } catch (error: any) {
        console.log("Clients List error: ", error.response.data);
        throw error.response.data;
    }
}

// Fetch a single client
export const fetchClientAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/client/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Create a new client
export const createClientAPI = async (payload: IClientRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/client`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Update a client
export const updateClientAPI = async (id: number, payload: IClientRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/v1/client/${id}`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Delete a client
export const deleteClientAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/client/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}
