import { AUTH_SIGN_IN, BASE_URL } from "@/constants";
import { http, HttpResponse } from "msw";

export const authHandlersMock = {
  post: http.post(`${BASE_URL}${AUTH_SIGN_IN}`, () => {
    //response with network error.
    return HttpResponse.error();
  }),
};
