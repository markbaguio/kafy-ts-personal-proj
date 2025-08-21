import { z } from "zod";

export const OrderStatusSchema = z.enum([
  "orderPlaced",
  "orderInProgress",
  "completed",
  "canceled",
  // add other statuses here exactly as they are in the DB enum
]);

export const OrderSchema = z.object({
  id: z.number().int().positive(),
  total_amount: z.number(), // Will parse from numeric(10, 2) as number in JS
  status: OrderStatusSchema,
  created_at: z.string().datetime(), // Postgres timestamp with timezone → string in JSON
  profile_id: z.string().uuid(),
});

export const OrderIDOnlySchema = OrderSchema.pick({ id: true });
