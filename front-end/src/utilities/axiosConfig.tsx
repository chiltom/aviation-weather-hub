import axios, { AxiosInstance } from "axios";

/**
 * @description The AxiosInstance configuration that the application uses to make requests
 * to the back-end server.
 */
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
  // withXSRFToken: true,
});
