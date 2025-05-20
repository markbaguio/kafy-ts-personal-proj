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
      return HttpResponse.json(successfulSignInProfileData);
    }
  ),
];
