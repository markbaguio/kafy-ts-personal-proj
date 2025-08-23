import { ApiResponse } from "@/models/ApiResponse";
import {
  OrdersWithOrderItemsWithImage,
  OrdersWithOrderItemsWithImageAndCategory,
} from "@/models/types";
import { getOrders } from "@/services/orderService";
import { queryOptions, UseQueryOptions } from "@tanstack/react-query";

type GetOrdersQueryOptionsParam = {
  status: string;
};

export function createGetOrdersQueryOptions(
  params?: GetOrdersQueryOptionsParam,
  options?: Omit<
    UseQueryOptions<ApiResponse<OrdersWithOrderItemsWithImageAndCategory>>,
    "queryFn" | "queryKey"
  >
) {
  return queryOptions({
    ...options,
    queryKey: ["orders", params],
    queryFn: () => getOrders({ status: params?.status }),
  });
}
