import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  withCredentials: true,
  responseType: "json",
});

export default axiosInstance;
