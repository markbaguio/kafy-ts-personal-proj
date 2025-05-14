import { ApiErrorResponse, ApiResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/types";
import axios, { isAxiosError } from "axios";
import {
  AUTH_SIGN_IN,
  AUTH_SIGN_UP,
  AxiosErrorCode,
  BASE_URL,
} from "../constants";
import { isApiErrorResponse } from "@/lib/utils";
import { z, ZodError } from "zod";
import { UserSignInSchema } from "@/schemas/auth/UserSignInFormSchema";
import { ProfileSchema } from "@/schemas/profile/ProfileSchema";
import { UserSignUpFormSchema } from "@/schemas/auth/UserSignUpFormSchema";

// export type SignInPayload = UserSignInFormType;
export type SignInPayload = z.infer<typeof UserSignInSchema>;

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
    console.log(response);

    const parsedProfile = ProfileSchema.safeParse(response.data.data);
    if (!parsedProfile.success) {
      throw new ZodError(parsedProfile.error.errors);
    }
    return {
      ...response.data,
      data: parsedProfile.data,
    };

    // return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const responseErrorData: ApiErrorResponse = error.response?.data; //? Check if there are specific error response.
      if (error.code === AxiosErrorCode.NetworkError) {
        throw new ApiErrorResponse(
          503,
          "ERR_NETWORK",
          "Unable to reach server. Please check your internet connection."
        );
      }
      if (error.response?.data && isApiErrorResponse(responseErrorData)) {
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
  }
}

export async function signOutUser() {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/signout`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(response);
  } catch (error) {
    if (isAxiosError(error)) {
      const responseErrorData: ApiErrorResponse = error.response?.data; //? Check if there are specific error response.
      if (error.code === AxiosErrorCode.NetworkError) {
        throw new ApiErrorResponse(
          503,
          "ERR_NETWORK",
          "Unable to reach server. Please check your internet connection."
        );
      }
      if (responseErrorData) {
        throw new ApiErrorResponse(
          responseErrorData.statusCode,
          responseErrorData.errorName,
          responseErrorData.message,
          responseErrorData.errorDetails
        );
      }
    }

    throw new Error("An unexpected error occurred");
  }
}

// export type signUpPayload = UserSignUpFormType;
export type signUpPayload = z.infer<typeof UserSignUpFormSchema>;

export async function signUpUser(
  payload: signUpPayload
): Promise<ApiResponse<Profile>> {
  try {
    const response = await axios.post<ApiResponse<Profile>>(
      `${BASE_URL}${AUTH_SIGN_UP}`,
      payload,
      { withCredentials: true }
    );
    const parsedProfile = ProfileSchema.safeParse(response.data.data);

    if (!parsedProfile.success) {
      throw new ZodError(parsedProfile.error.errors);
    }
    return {
      ...response.data,
      data: parsedProfile.data,
    };

    // return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const responseErrorData: ApiErrorResponse = error.response?.data; //? Check if there are specific error response.
      if (error.code === AxiosErrorCode.NetworkError) {
        throw new ApiErrorResponse(
          503,
          "ERR_NETWORK",
          "Unable to reach server. Please check your internet connection."
        );
      }
      if (responseErrorData && isApiErrorResponse(responseErrorData)) {
        throw new ApiErrorResponse(
          responseErrorData.statusCode,
          responseErrorData.errorName,
          responseErrorData.message,
          responseErrorData.errorDetails
        );
      }
    }
    throw new Error("An unexpected error occurred");
  }
}
