import router from "@/routes/router";
import { refreshAccessToken } from "@/services/authServiceApi";
import axios, { InternalAxiosRequestConfig, isAxiosError } from "axios";

//! RefreshAccessToken doesn't work it's throwing AuthApiError: Invalid Refresh Token: Already Used

// interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
//   _alreadyRefreshedOnce: boolean;
// }

export const axiosInstance = axios.create();

//? BASELINE. Improve this.
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config;

//     // let _alreadyRefreshedOnce: boolean = originalRequest._alreadyRefreshedOnce;
//     if (error.status === 403 || error.status === 401) {
//       // console.log("1: ", _alreadyRefreshedOnce);
//       // _alreadyRefreshedOnce = true;
//       // console.log("2: ", _alreadyRefreshedOnce);

//       try {
//         await refreshAccessToken();
//         if (originalRequest) {
//           return axios(originalRequest);
//         }
//       } catch (error) {
//         if (isAxiosError(error)) {
//           console.error(error);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

//TODO: Handle the scenario where the refresh token is denied.

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry: boolean;
    };

    if (
      (error.status === 403 || error.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; //? Set to true if the refresh is already executed once to assure the there will be no infinite loops.

      try {
        await refreshAccessToken();
        return axios(originalRequest);
      } catch (refreshError) {
        //TODO: call sign out to remove session.
        console.log("refresh error");
        console.log(refreshError);
        //? If the try block above fails, redirect user to the sign in page.
        //? If the user successfully signs in they will be brought back to where they were before.
        router.navigate(`/auth/signin?redirect=${window.location.pathname}`);
      }
    }
    return Promise.reject(error); //? reject the Promise and pass the error so that the error will be handled by the origin of the call/function call.
  }
);
