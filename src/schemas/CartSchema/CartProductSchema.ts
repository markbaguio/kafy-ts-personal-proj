import { z } from "zod";
import { ProductSizeSchema } from "../Menu/ProductSchema";

//? this is the frontend type for the cart product. This will be the structure that
//? will be sent to the backend. It is derived from the order_items minus the order_items.id,
//? order_items.created_at, and order_items.order_id
//? order_items.id, order_items.created_at, and order_items.order_id will be handled in the backend.

//? price_at_purchase will be calculated using unit_price * quantity
export const CartProductSchema = z.object({
  product_id: z.number().int(),
  product_name: z.string(),
  product_category: z.string(),
  unit_price: z.number().nonnegative(),
  quantity: z.number().int().nonnegative().min(1),
  product_size: ProductSizeSchema,
  img_url: z.string(),
});
