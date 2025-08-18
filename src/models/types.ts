import { CartProductSchema } from "@/schemas/CartSchema/CartProductSchema";
import { OrderItemSchema } from "@/schemas/CartSchema/OrderItemSchema";
import {
  PaginatedProductsSchema,
  ProductSchema,
} from "@/schemas/Menu/ProductSchema";
import {
  CreateOrderItemSchema,
  CreateOrderItemsSchema,
} from "@/schemas/OrderItemSchema/CreateOrderItemSchema/CreateOrderItemSchema";
import { CreateOrderSchema } from "@/schemas/OrderSchema/CreateOrderSchema/CreateOrderSchema";
import { OrderSchema } from "@/schemas/OrderSchema/Order/OrderSchema";
import { PlaceOrderPayloadSchema } from "@/schemas/PlaceOrderPayloadSchema/PlaceOrderPayloadSchema";
import { ProfileSchema } from "@/schemas/profile/ProfileSchema";
import { ShippingInformationSchema } from "@/schemas/ShippingInformationSchema/ShippingInformationSchema";
import { z } from "zod";

export type Profile = z.infer<typeof ProfileSchema>;

export type Product = z.infer<typeof ProductSchema>;
// export type PaginatedProducts = {
//   products: Product[];
//   pagination: Pagination;
// };
export type PaginatedProducts = z.infer<typeof PaginatedProductsSchema>;
export enum MockProductCategoryEnum {
  hot = "hot",
  cold = "cold",
  pastries = "pastries",
  snacks = "snacks",
  lunch = "lunch",
  treats = "treats",
}

export type OrderItem = z.infer<typeof OrderItemSchema>;

export type CartProduct = z.infer<typeof CartProductSchema>;

export type CreateOrderType = z.infer<typeof CreateOrderSchema>;

export type CreateOrderItemType = z.infer<typeof CreateOrderItemSchema>;

export type CreateOrderItemsType = z.infer<typeof CreateOrderItemsSchema>;

export type PlaceOrderPayloadType = z.infer<typeof PlaceOrderPayloadSchema>;

export type ShippingInformationType = z.infer<typeof ShippingInformationSchema>;

export type Order = z.infer<typeof OrderSchema>;
