/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/axios/axiosClient";
import { MyResponse } from "@/types";
import { IUserRequest } from "@/types/user"; // Assuming you have these types defined

// Fetch list of users
export const fetchListOfUsersAPI = async (page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/users?page=${page}&size=${size}`);
        console.log("Users List data: ", data);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Search users
export const searchUsersAPI = async (keyword: string, page: number, size: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/users/search?keyword=${keyword}&page=${page}&size=${size}`);
        console.log("Users List data: ", data);
        return data;
    } catch (error: any) {
        console.log("Users List error: ", error.response.data);
        throw error.response.data;
    }
};

// Fetch a single user
export const fetchUserAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/user/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Create a new user
export const createUserAPI = async (payload: IUserRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/user`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Update a user
export const updateUserAPI = async (id: number, payload: IUserRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/v1/user/${id}`, payload);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
};

// Delete a user
export const deleteUserAPI = async (id: number): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/user/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
};
