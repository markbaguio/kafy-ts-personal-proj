import { FAVORITE, AxiosErrorCode, BASE_URL, MENU } from "@/constants";
import { axiosInstance } from "@/lib/axiosInterceptors/responseInterceptor";
import { isApiErrorResponse } from "@/lib/utils";
import { ApiErrorResponse, ApiResponse } from "@/models/ApiResponse";
import {
  AddToFavoritePayload,
  AddToFavoriteResponse,
  MockProductCategoryEnum,
  PaginatedProducts,
  Product,
  RemoveFavoritePayload,
  UserFavoriteProducts,
} from "@/models/types";
import {
  AddToFavoriteResponseSchema,
  FavoriteSchema,
  UserFavoriteProductsSchema,
} from "@/schemas/Favorite/FavoriteSchema";
import {
  PaginatedProductsSchema,
  ProductSchema,
} from "@/schemas/Menu/ProductSchema";
import { MenuProductDetailPageParams } from "@/schemas/MenuProductDetailPage/MenuProductDetailParamsSchema";
import axios, { isAxiosError } from "axios";
import { ZodError } from "zod";

type GetProductPayload = {
  page?: string;
  category?: string;
};

export async function getAllProducts({
  category = MockProductCategoryEnum.hot,
  page = "1",
}: GetProductPayload): Promise<ApiResponse<PaginatedProducts>> {
  //? simulated network latency to show edge case (loading state)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await axios.get<ApiResponse<PaginatedProducts>>(
      `${BASE_URL}${MENU}`,
      {
        params: {
          page: page,
          category: category,
        },
      }
    );

    const parsedPaginatedProducts = PaginatedProductsSchema.safeParse(
      response.data.data
    );
    if (!parsedPaginatedProducts.success) {
      throw new ZodError(parsedPaginatedProducts.error.errors);
    }
    return {
      ...response.data,
      data: parsedPaginatedProducts.data,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error);
    }
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

export async function getProductDetail(
  params: MenuProductDetailPageParams
): Promise<ApiResponse<Product>> {
  //? simulated network latency to show edge case (loading state)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await axios.get<ApiResponse<Product>>(
      `${BASE_URL}${MENU}/${params.product_id}`
    );

    const parsedResponse = ProductSchema.safeParse(response.data.data);
    if (!parsedResponse.success) {
      throw new ZodError(parsedResponse.error.errors);
    }

    return {
      statusCode: response.status,
      data: parsedResponse.data,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error);
    }
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

export async function addToFavorite(
  payload: AddToFavoritePayload
): Promise<ApiResponse<AddToFavoriteResponse>> {
  try {
    const response = await axiosInstance.post<
      ApiResponse<AddToFavoriteResponse>
    >(`${BASE_URL}${FAVORITE}`, payload, {
      withCredentials: true,
    });

    const parsedResponse = AddToFavoriteResponseSchema.safeParse(
      response.data.data
    );

    if (!parsedResponse.success) {
      throw new ZodError(parsedResponse.error.errors);
    }

    return {
      statusCode: response.status,
      data: parsedResponse.data,
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

export async function getUserFavorites(): Promise<
  ApiResponse<UserFavoriteProducts>
> {
  try {
    const response = await axiosInstance.get<ApiResponse<UserFavoriteProducts>>(
      `${BASE_URL}${FAVORITE}`,
      {
        withCredentials: true,
      }
    );

    const parsedResponse = UserFavoriteProductsSchema.safeParse(
      response.data.data
    );

    if (!parsedResponse.success) {
      throw new ZodError(parsedResponse.error.errors);
    }

    return {
      statusCode: response.status,
      data: parsedResponse.data,
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

export async function removeFavorite(
  payload: RemoveFavoritePayload
): Promise<ApiResponse<RemoveFavoritePayload>> {
  try {
    const response = await axiosInstance.delete<
      ApiResponse<RemoveFavoritePayload>
    >(`${BASE_URL}${FAVORITE}/${payload.id}`, {
      withCredentials: true,
    });

    const parsedResponse = FavoriteSchema.safeParse(response.data.data);

    if (!parsedResponse.success) {
      throw new ZodError(parsedResponse.error.errors);
    }

    return {
      statusCode: response.status,
      data: response.data.data,
    };
  } catch (error) {
    //! handle the zod error thrown above (condition !parsedResponse.success)
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
