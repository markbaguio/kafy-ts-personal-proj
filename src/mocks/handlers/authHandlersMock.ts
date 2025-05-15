import { AUTH_SIGN_IN, BASE_URL } from "@/constants";
import { http, HttpResponse } from "msw";
import { successfulSignInData } from "../mockData/mockData";

export const authHandlersMock = [
  http.post(`${BASE_URL}${AUTH_SIGN_IN}`, () => {
    // return network error
    return HttpResponse.error();
  }),

  http.post(`${BASE_URL}${AUTH_SIGN_IN}`, () => {
    // mock for a successful sign in
    return HttpResponse.json(successfulSignInData);
  }),
];
