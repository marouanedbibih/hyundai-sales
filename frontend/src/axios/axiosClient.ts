import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getApiUrl } from '@/config';

const apiUrl = getApiUrl();

const axiosClient = axios.create({
  baseURL: `${apiUrl}`,
});



axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  console.log("Token in axios: ", token);
  if (token && config.headers) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError) => {
  const { response } = error;
  if (response) {
    if (response.status === 401) {
      localStorage.removeItem('JWT_TOKEN');
    } else if (response.status === 404) {
    }
  }
  return Promise.reject(error);
});

export default axiosClient;
