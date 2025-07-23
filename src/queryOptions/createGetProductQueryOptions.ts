import { ApiResponse } from "@/models/ApiResponse";
import { PaginatedProducts } from "@/models/types";
import { getAllProducts } from "@/services/productService";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

type GetProductQueryOptionsParam = {
  page: string;
  catergory: string;
};

export function createGetProductQueryOptions(
  params?: GetProductQueryOptionsParam,
  options?: Omit<
    UseQueryOptions<ApiResponse<PaginatedProducts>>,
    "queryKey" | "queryFn"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["products", params],
    queryFn: () =>
      getAllProducts({ page: params?.page, category: params?.catergory }),
  });
}
