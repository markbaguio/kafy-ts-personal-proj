import { OrderItemWithImageSchema } from "@/schemas/OrderItemSchema/CreateOrderItemSchema/CreateOrderItemSchema";
import { z } from "zod";

export enum OrderStatusEnum {
  "orderPlaced",
  "orderInProgress",
  "completed",
  "canceled",
}

export const OrderStatusSchema = z.enum([
  "orderPlaced",
  "orderInProgress",
  "completed",
  "canceled",
  // add other statuses here exactly as they are in the DB enum
]);

export const OrderSchema = z.object({
  id: z.number(),
  total_amount: z.number(), // Will parse from numeric(10, 2) as number in JS
  status: OrderStatusSchema,
  created_at: z.string(), // Postgres timestamp with timezone → string in JSON
  profile_id: z.string(),
});

export const OrderIDOnlySchema = OrderSchema.pick({ id: true });

export const OrdersWithOrderItemsWithImageSchema = OrderSchema.extend({
  order_items: z.array(OrderItemWithImageSchema),
});

export const OrdersWithOrderItemsWithImageSchemaArray = z.array(
  OrdersWithOrderItemsWithImageSchema
);
