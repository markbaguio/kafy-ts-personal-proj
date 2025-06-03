import { AUTH_SIGN_IN, AUTH_SIGN_UP, BASE_URL } from "@/constants";
import { http, HttpResponse } from "msw";
import { successfulAuthResponse } from "../mockData/mockData";
import { ApiResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/types";
import { UserSignInFormType } from "@/components/ui/login-form";
import { UserSignUpFormType } from "@/components/common/signupform/SignUpForm";

export type UserSignInRequestBody = UserSignInFormType;
export type UserSignUpRequestBody = UserSignUpFormType;

type UserSignInResponseBody = ApiResponse<Profile>;
type UserSignUpResponseBody = ApiResponse<Profile>;

export const handlers = [
  //? Sign in handler
  http.post<{}, UserSignInRequestBody, UserSignInResponseBody>(
    `${BASE_URL}${AUTH_SIGN_IN}`,
    () => {
      return HttpResponse.json(successfulAuthResponse, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie":
            "auth_token=fake_access_token; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=3600;, refresh_token=fake_refresh_token; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=3600",
        },
      });
    }
  ),
  //? Sign up handler
  http.post<{}, UserSignUpRequestBody, UserSignUpResponseBody>(
    `${BASE_URL}${AUTH_SIGN_UP}`,
    () => {
      return HttpResponse.json(successfulAuthResponse, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie":
            "auth_token=fake_access_token; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=3600;, refresh_token=fake_refresh_token; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=3600",
        },
      });
    }
  ),
];
