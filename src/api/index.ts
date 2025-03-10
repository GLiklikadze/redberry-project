import axios, { AxiosInstance } from "axios";

const axiosConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
};

export const httpClient: AxiosInstance = axios.create(axiosConfig);
