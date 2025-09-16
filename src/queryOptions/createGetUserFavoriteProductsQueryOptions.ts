import { ApiResponse } from "@/models/ApiResponse";
import { UserFavoriteProducts } from "@/models/types";
import { getUserFavoriteProducts } from "@/services/productService";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export function createGetUserFavoriteProductsQueryOptions(
  options?: Omit<
    UseQueryOptions<ApiResponse<UserFavoriteProducts>>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["favorites"],
    queryFn: getUserFavoriteProducts,
  });
}
