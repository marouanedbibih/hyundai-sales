/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/axios/axiosClient";
import { MyResponse } from "@/types";
import { IVehicleRequest } from "@/types/vehicle"; // Assuming you have a `Vehicle` interface

// Fetch list of vehicles
export const fetchListOfVehiclesAPI = async (page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/vehicles?page=${page}&size=${size}`);
        console.log("Vehicles List data: ", data);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Search vehicles
export const searchVehiclesAPI = async (keyword: string, page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/vehicles/search?keyword=${keyword}&page=${page}&size=${size}`);
        console.log("Search Vehicles data: ", data);
        return data;
    } catch (error: any) {
        console.log("Search Vehicles error: ", error.response.data);
        throw error.response.data;
    }
}

// Fetch a single vehicle
export const fetchVehicleAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/vehicle/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Create a new vehicle
export const createVehicleAPI = async (payload: IVehicleRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/vehicle`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Update a vehicle
export const updateVehicleAPI = async (id: number, payload: IVehicleRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/v1/vehicle/${id}`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Delete a vehicle
export const deleteVehicleAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/vehicle/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}
