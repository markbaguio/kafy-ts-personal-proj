import { capitalizeFirstLetter, formatCurrency } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { ShoppingBag, Dot } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import {
  CartProduct,
  OrderWithOrderItemsWithImageAndCategory,
} from "@/models/types";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/useCartStore";

type OrderCardProps = {
  // order: OrderWithOrderItemsWithImage;
  order: OrderWithOrderItemsWithImageAndCategory;
};

export default function OrderCard({ ...props }: OrderCardProps) {
  const navigate = useNavigate();
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  function handleBuyAgain(items: CartProduct[]) {
    items.forEach((item) => {
      addProductToCart({
        ...item,
      });
    });
  }

  return (
    <div
      key={props.order.id}
      className="flex flex-col gap-8 bg-milky-white border rounded-xl shadow-lg p-5"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <ShoppingBag strokeWidth={1} className="size-15" />
          <span className="text-3xl">{props.order.id}</span>
        </div>
        <div className="flex flex-row items-center bg-success-green/20 rounded-full px-3 py-2">
          <Dot className="text-success-green-accent" />
          <span className="text-xs text-success-green-accent ">
            Order being prepared
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-5">
        {/* Left bar */}
        <div className="relative flex flex-col justify-center w-1/12 items-center">
          {/* vertical line */}
          <div className="absolute top-0 bottom-0 w-1 bg-golden-brown" />
        </div>
        <ul className="flex flex-col gap-2 w-full">
          {props.order.order_items.map((orderItem) => (
            <li
              key={orderItem.id}
              className="hover:cursor-pointer hover:scale-101 transition-transform duration-500"
            >
              <Card
                className="p-0 overflow-hidden"
                onClick={() => navigate(`/menu/${orderItem.product_id}`)}
              >
                <CardContent className="p-0 flex flex-row gap-5">
                  <div className="relative w-fit">
                    <img
                      className="size-40 object-cover left:rounded-lg"
                      src={orderItem.image_url}
                      alt={orderItem.product_name}
                    />
                    <span className="bg-raisin-black text-milky-white min-w-[2ch] rounded-full absolute top-1 right-1 flex items-center justify-center h-7 w-7">
                      {orderItem.quantity}
                    </span>
                  </div>
                  <div className="w-full flex flex-col justify-center p-2">
                    <div className="flex flex-row justify-between">
                      <span className="text-2xl font-semibold">
                        {orderItem.product_name}
                      </span>
                      <span className="min-w-[2ch] text-2xl font-semibold px-5">
                        {formatCurrency(orderItem.price_at_purchase)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-raisin-black-muted">
                        Size:{" "}
                        <span className="text-blackhole font-semibold">
                          {orderItem.product_size}
                        </span>
                      </span>
                      <span className="text-raisin-black-muted">
                        Category:{" "}
                        <span className="text-blackhole font-semibold">
                          {capitalizeFirstLetter(orderItem.category)}
                        </span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>

      <Separator />
      <div className="flex justify-between items-center gap-2">
        <Button
          variant="secondary"
          className="w-fit"
          onClick={() => {
            console.log(props.order.order_items);
          }}
        >
          Buy again
        </Button>
        <span className="text-2xl text-raisin-black-muted">
          Order Total:{" "}
          <span className="bg-success-green/20 rounded-full p-2 text-2xl text-success-green-accent font-semibold min-w-[2ch]">
            {formatCurrency(props.order.total_amount)}
          </span>
        </span>
      </div>
    </div>
  );
}
