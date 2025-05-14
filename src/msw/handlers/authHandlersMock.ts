import { AUTH_SIGN_IN, BASE_URL } from "@/constants";
import { http, HttpResponse } from "msw";

export const authHandlersMock = [
  http.post(`${BASE_URL}${AUTH_SIGN_IN}`, () => {
    return HttpResponse.error();
  }),
];
