import { ApiResponse } from "@/models/ApiResponse";
import {
  GetLatestOrdersParams,
  OrdersWithOrderItemsWithImageAndCategory,
} from "@/models/types";
import { getLatestOrders } from "@/services/orderService";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

export function createGetLatestOrdersQueryOptions(
  params?: GetLatestOrdersParams,
  options?: Omit<
    UseQueryOptions<ApiResponse<OrdersWithOrderItemsWithImageAndCategory>>,
    "queryFn" | "queryKey"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["latestOrders", params],
    queryFn: () => getLatestOrders({ limit: params?.limit ?? 1 }),
  });
}
