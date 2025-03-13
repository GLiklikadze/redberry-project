import axios, { AxiosInstance } from "axios";

const baseUrl = "https://momentum.redberryinternship.ge/api";

const axiosConfig = {
  baseURL: baseUrl,
  headers: {
    Authorization: "Bearer 9e6a37c9-3e04-4b7a-a178-32290baad8f1",
  },
};

export const httpClient: AxiosInstance = axios.create(axiosConfig);
