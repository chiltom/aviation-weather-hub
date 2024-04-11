import axios, { AxiosInstance } from "axios";

/**
 * Axios instance that defines the config for all further axios
 * requests
 */
export const api: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});
