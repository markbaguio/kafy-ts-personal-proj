import {
  CartProduct,
  CreateOrderItemsType,
  PlaceOrderPayloadType,
} from "@/models/types";
import { CreateOrderItemsSchema } from "@/schemas/OrderItemSchema/CreateOrderItemSchema/CreateOrderItemSchema";
import { PlaceOrderPayloadSchema } from "@/schemas/PlaceOrderPayloadSchema/PlaceOrderPayloadSchema";

type createPlaceOrderPayloadResult =
  | {
      success: true;
      data: PlaceOrderPayloadType;
    }
  | {
      success: false;
      message: string;
    };

export function createPlaceOrderPayload(
  cartProducts: CartProduct[]
): createPlaceOrderPayloadResult {
  const rawOrderItems: CreateOrderItemsType = cartProducts.map((product) => ({
    product_id: product.product_id,
    product_name: product.product_name,
    price_at_purchase: product.unit_price,
    product_size: product.product_size,
    quantity: product.quantity,
  }));

  const parsedOrderItems = CreateOrderItemsSchema.safeParse(rawOrderItems);

  if (!parsedOrderItems.success) {
    return {
      success: false,
      message:
        "Invalid Cart contents. Please check the content of your cart and try again.",
    };
  }

  const placeOrderPayload: PlaceOrderPayloadType = {
    order_items: parsedOrderItems.data,
  };

  const parsedPlaceOrderPayload =
    PlaceOrderPayloadSchema.safeParse(placeOrderPayload);

  if (!parsedPlaceOrderPayload.success) {
    return {
      success: false,
      message: "Something went wrong preparing your order. Please try again.",
    };
  }

  return {
    success: true,
    data: parsedPlaceOrderPayload.data,
  };
}
