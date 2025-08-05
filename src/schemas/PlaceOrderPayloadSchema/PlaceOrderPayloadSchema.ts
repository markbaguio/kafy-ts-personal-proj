import z from "zod";
import { CreateOrderItemsSchema } from "../OrderItemSchema/CreateOrderItemSchema/CreateOrderItemSchema";

export const PlaceOrderPayloadSchema = z.object({
  order_items: CreateOrderItemsSchema,
});
