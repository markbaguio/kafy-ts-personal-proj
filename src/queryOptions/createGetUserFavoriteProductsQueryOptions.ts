import { ApiResponse } from "@/models/ApiResponse";
import { UserFavoriteProducts } from "@/models/types";
import { getUserFavoriteProducts } from "@/services/productService";
import { queryOptions, QueryOptions } from "@tanstack/react-query";

export function createGetUserFavoriteProductsQueryOptions(
  options?: Omit<
    QueryOptions<ApiResponse<UserFavoriteProducts>>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["favorites"],
    queryFn: getUserFavoriteProducts,
  });
}
