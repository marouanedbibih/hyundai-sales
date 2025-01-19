/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/axios/axiosClient";
import { MyResponse } from "@/types";
import { IAuthRequest } from "@/types/auth";

// Call Login API
export const loginAPI = async (auth: IAuthRequest): Promise<MyResponse> => {
    try {
        const { data } = await axiosClient.post('/api/v1/login', auth);
        console.log(data);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }

}