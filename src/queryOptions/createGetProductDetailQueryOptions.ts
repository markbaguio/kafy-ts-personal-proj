import { ApiResponse } from "@/models/ApiResponse";
import { Product } from "@/models/types";
import { MenuProductDetailPageParams } from "@/schemas/MenuProductDetailPage/MenuProductDetailParamsSchema";
import { getProductDetail } from "@/services/productService";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

//? options?: Omit<UseQueryOptions<ApiResponse<Product>>, "queryKey" | "queryFn">
//? Omit: omit the queryKey and queryFn because it's already explicitly declared.
//? The UseQueryOptions<TData> generic type (from @tanstack/react-query) defines the expected return data type of the query.
//? UseQueryOption<ApiResponse<Product>> tells react query/tanstack query that the returned [data] of this useQuery will be of type ApiResponse<Product>

export default function createProductDetailQueryOptions(
  params: MenuProductDetailPageParams,
  options?: Omit<UseQueryOptions<ApiResponse<Product>>, "queryKey" | "queryFn">
) {
  return queryOptions({
    ...options,
    queryKey: ["productDetail", params],
    queryFn: () => getProductDetail(params),
  });
}
