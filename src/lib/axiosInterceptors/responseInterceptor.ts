import { refreshAccessToken } from "@/services/authServiceApi";
import axios, { AxiosError, isAxiosError } from "axios";

//! RefreshAccessToken doesn't work it's throwing AuthApiError: Invalid Refresh Token: Already Used

export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.status === 403 || error.status === 401) {
      try {
        await refreshAccessToken();
        if (originalRequest) {
          return axios(originalRequest);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(error);
        }
      }
      return Promise.reject(error);
    }
  }
);
