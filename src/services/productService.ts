import { AxiosErrorCode, BASE_URL, MENU } from "@/constants";
import { isApiErrorResponse } from "@/lib/utils";
import { ApiErrorResponse, ApiResponse } from "@/models/ApiResponse";
import { Product, ProductCategoryEnum } from "@/models/types";
import { ProductArraySchema } from "@/schemas/Menu/MenuItemSchema";
import axios, { isAxiosError } from "axios";
import { ZodError } from "zod";

type GetProductPayload = {
  page?: number;
  category?: string;
};

export async function getProducts({
  category = ProductCategoryEnum.hot,
  page = 1,
}: GetProductPayload): Promise<ApiResponse<Product[]>> {
  try {
    const response = await axios.get<ApiResponse<Product[]>>(
      `${BASE_URL}${MENU}`,
      {
        params: {
          page: page,
          category: category,
        },
      }
    );
    const parsedProducts = ProductArraySchema.safeParse(response.data.data);
    if (!parsedProducts.success) {
      throw new ZodError(parsedProducts.error.errors);
    }

    return {
      ...response.data,
      data: parsedProducts.data,
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
