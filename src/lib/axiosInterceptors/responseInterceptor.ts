import { refreshAccessToken } from "@/services/authServiceApi";
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";

//! RefreshAccessToken doesn't work it's throwing AuthApiError: Invalid Refresh Token: Already Used

// interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
//   _alreadyRefreshedOnce: boolean;
// }

export const axiosInstance = axios.create();

//TODO Try this. Use this as baseline if this works then improve.
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // let _alreadyRefreshedOnce: boolean = originalRequest._alreadyRefreshedOnce;
    if (error.status === 403 || error.status === 401) {
      // console.log("1: ", _alreadyRefreshedOnce);
      // _alreadyRefreshedOnce = true;
      // console.log("2: ", _alreadyRefreshedOnce);

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
    }
    return Promise.reject(error);
  }
);
