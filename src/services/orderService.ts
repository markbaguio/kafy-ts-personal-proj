import { AxiosErrorCode, BASE_URL, ORDERS_PAGE } from "@/constants";
import { axiosInstance } from "@/lib/axiosInterceptors/responseInterceptor";
import { isApiErrorResponse } from "@/lib/utils";
import { ApiErrorResponse, ApiResponse } from "@/models/ApiResponse";
import { OrdersWithOrderItemsWithImageAndCategory } from "@/models/types";
import { OrdersWithOrderItemsWithImageAndCategorySchemaArray } from "@/schemas/OrderSchema/Order/OrderSchema";
import { isAxiosError } from "axios";
import { ZodError } from "zod";

type GetOrdersParams = {
  status?: string;
};

export async function getOrders({
  status = "orderPlaced",
}: GetOrdersParams): Promise<
  ApiResponse<OrdersWithOrderItemsWithImageAndCategory>
> {
  //? This Promise timeout simulates network latency to show edge case (loading state)
  //TODO: remove this delay. this might be the cause of the refresh auth token not working properly.
  //   await new Promise((resolve) => setTimeout(resolve, 1500));
  try {
    console.log("Fetching orders with status:", status);
    const response = await axiosInstance.get<
      ApiResponse<OrdersWithOrderItemsWithImageAndCategory>
    >(`${BASE_URL}${ORDERS_PAGE}`, {
      params: { status },
      withCredentials: true,
    });

    const parsedOrdersWithOrderItemsWithImage =
      OrdersWithOrderItemsWithImageAndCategorySchemaArray.safeParse(
        response.data.data
      );

    if (!parsedOrdersWithOrderItemsWithImage.success) {
      throw new ZodError(parsedOrdersWithOrderItemsWithImage.error.errors);
    }

    console.log("response", response);

    return {
      statusCode: response.status,
      data: parsedOrdersWithOrderItemsWithImage.data,
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
