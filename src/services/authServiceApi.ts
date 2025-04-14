import { ApiErrorResponse, ApiResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/Profile";
import axios, { isAxiosError } from "axios";
import { AUTH_SIGN_IN, AxiosErrorCode, BASE_URL } from "../constants";
import { UserSignInFormType } from "@/components/ui/login-form";
import { isApiErrorResponse } from "@/lib/utils";

export type SignInPayload = UserSignInFormType;

export async function signInUser(
  payload: SignInPayload
): Promise<ApiResponse<Profile>> {
  try {
    const response = await axios.post<ApiResponse<Profile>>(
      `${BASE_URL}${AUTH_SIGN_IN}`,
      payload,
      {
        withCredentials: true,
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const responseErrorData = error.response?.data; //? Check if there are specifig error response.
      if (error.code === AxiosErrorCode.NetworkError) {
        throw new ApiErrorResponse(
          503,
          "ERR_NETWORK",
          "Unable to reach server. Please check your internet connection."
        );
      }
      if (responseErrorData && isApiErrorResponse(responseErrorData)) {
        // throw Error(responseErrorData.message);
        throw new ApiErrorResponse(
          responseErrorData.statusCode,
          responseErrorData.errorName,
          responseErrorData.message,
          responseErrorData.errorDetails
        );
      }
    }

    //? for unknown errors
    throw new Error("An unexpected error occurred");

    // throw error; // Re-throw the error to ensure the function always returns or throws error to onError in UseMutation.
  }
}
