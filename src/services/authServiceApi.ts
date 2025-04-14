import { ApiResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/Profile";
import axios, { isAxiosError } from "axios";
import { AUTH_SIGN_IN, AxiosErrorCode, BASE_URL } from "../constants";
import { UserSignInFormType } from "@/components/ui/login-form";

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
    // TODO: handle errors. Type checks etc... to display proper error message.
    // console.log(error);
    if (isAxiosError(error)) {
      const responseData = error.response?.data;
      if (error.code === AxiosErrorCode.NetworkError) {
        throw error; // throw error for the onError of the useMutation
      }
      // if (isApiErrorResponse(responseData)) {
      //   // throw new Error(responseData.message);
      //   throw Error(responseData.message);
      // }
    }

    //? for unknown errors
    throw new Error("An unexpected error occurred");

    // throw error; // Re-throw the error to ensure the function always returns or throws error to onError in UseMutation.
  }
}
