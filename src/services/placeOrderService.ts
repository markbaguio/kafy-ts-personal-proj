import { AxiosErrorCode, BASE_URL, PLACE_ORDER } from "@/constants";
import { axiosInstance } from "@/lib/axiosInterceptors/responseInterceptor";
import { isApiErrorResponse } from "@/lib/utils";
import { ApiErrorResponse, ApiResponse } from "@/models/ApiResponse";
import { Order, PlaceOrderPayloadType } from "@/models/types";
import { OrderIDOnlySchema } from "@/schemas/OrderSchema/Order/OrderSchema";
import { isAxiosError } from "axios";
import { ZodError } from "zod";

export async function placeOrder(
  payload: PlaceOrderPayloadType
): Promise<ApiResponse<Pick<Order, "id">>> {
  try {
    //? Used axiosInstance instead of plain axios in order for the reponse to be intercepted by the interceptor.
    //? if access_token is expired or invalid, the interceptor will execute a refresh post request to the backend to refresh the user's access token.
    const response = await axiosInstance.post<ApiResponse<null>>(
      `${BASE_URL}${PLACE_ORDER}`,
      payload,
      {
        withCredentials: true,
      }
    );

    const parsedResponse = OrderIDOnlySchema.safeParse(response.data.data);

    if (!parsedResponse.success) {
      throw new ZodError(parsedResponse.error.errors);
    }

    return {
      statusCode: response.status,
      data: {
        id: parsedResponse.data.id,
      },
    };
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
