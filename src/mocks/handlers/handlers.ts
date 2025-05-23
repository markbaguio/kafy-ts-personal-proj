import { AUTH_SIGN_IN, BASE_URL } from "@/constants";
import { http, HttpResponse } from "msw";
import { successfulSignInProfileData } from "../mockData/mockData";
import { ApiResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/types";
import { UserSignInFormType } from "@/components/ui/login-form";

export type UserSignInRequestBody = UserSignInFormType;

type UserSignInResponstBody = ApiResponse<Profile>;

export const handlers = [
  http.post<{}, UserSignInRequestBody, UserSignInResponstBody>(
    `${BASE_URL}${AUTH_SIGN_IN}`,
    () => {
      return HttpResponse.json(successfulSignInProfileData, {
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
