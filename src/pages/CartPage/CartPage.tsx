import { QuantityInput } from "@/components/common/QuantityInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MockOrderSummaryValues,
  OrderSummaryTextValues,
  PESOSIGN,
} from "@/constants";
import { capitalizeFirstLetter, cn, formattedCurrency } from "@/lib/utils";
import { CartProduct } from "@/models/types";
import { ProductSize } from "@/schemas/MenuProductDetailPage/MenuProductDetailParamsSchema";
import { useCartStore } from "@/store/useCartStore";
import { Separator } from "@/components/ui/separator";
import { Info, X } from "lucide-react";
import { useNavigate } from "react-router";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ReactNode } from "react";

type InfoIconProps = {
  message: string;
  icon?: ReactNode;
  className?: string;
};

type CartProductCardProps = {
  cartProduct: CartProduct;
  onCartProductClick: () => void;
  onDeleteCartProduct: (productID: number) => void;
  onCartProductQuantityChange: (
    productID: number,
    productSize: ProductSize,
    newQty: number
  ) => void;
};

type OrderSummaryProps = {
  calculatedSubtotal: number;
  calculatedOrderTotal: number;
};

function CartPage() {
  const navigate = useNavigate();

  const cartProducts = useCartStore((state) => state.cartProducts);
  const updateCartProductQuantity = useCartStore(
    (state) => state.updateCartProductQuantity
  );
  const deleteCartProduct = useCartStore(
    (state) => state.removeProductFromCart
  );

  function formatCartHeaderSummary(length: number): [string, string] {
    const itemText = `${length} item${length <= 1 ? "" : "s"}`;
    return [itemText, " in your cart."];
  }

  function handleCartProductClick(productID: number) {
    navigate(`/menu/${productID.toString()}`);
  }

  function handleCartProductQuantityChange(
    productID: number,
    productSize: ProductSize,
    newQty: number
  ) {
    updateCartProductQuantity(productID, productSize, newQty);
    // console.log(productID, newQty);
  }

  function handleDeleteCartProduct(productID: number) {
    deleteCartProduct(productID);
  }

  function calculateSubtotal(cartProducts: CartProduct[]): number {
    return cartProducts.reduce(
      (total, product) => total + product.price_at_purchase * product.quantity,
      0
    );
  }

  function calculateOrderTotal({
    subtotal,
    tax,
    deliveryEstimate,
  }: {
    subtotal: number;
    tax: number;
    deliveryEstimate: number;
    test: string;
  }): number {
    return subtotal - (tax + deliveryEstimate);
  }

  const [highlightedText, text] = formatCartHeaderSummary(cartProducts.length);

  const calculatedSubtotal = calculateSubtotal(cartProducts);
  const calculatedOrderTotal = calculateOrderTotal({
    subtotal: calculatedSubtotal,
    deliveryEstimate: MockOrderSummaryValues.deliveryEstimate,
    tax: MockOrderSummaryValues.tax,
    test: "test",
  });

  return (
    <main className="w-full bg-off-white-2/50 p-5 lg:px-30 lg:py-10 flex flex-col gap-5">
      <div className="text-start w-full">
        <h1 className="text-4xl">Your Cart</h1>
        <span className="text-xl">
          <span className="font-bold">{highlightedText}</span>
          {text}
        </span>
      </div>
      <section className="mx-auto w-full grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-6 h-full">
        {/** Cart Product list and header*/}
        <section className="flex flex-col gap-6">
          {cartProducts.length > 0 ? (
            <div className="w-full bg-milky-white shadow-xl rounded-xl flex flex-col gap-3 p-5 ">
              {cartProducts.map((cartProduct) => (
                <>
                  <CartProductCard
                    key={cartProduct.product_id}
                    onCartProductClick={() =>
                      handleCartProductClick(cartProduct.product_id)
                    }
                    onDeleteCartProduct={handleDeleteCartProduct}
                    onCartProductQuantityChange={
                      handleCartProductQuantityChange
                    }
                    cartProduct={cartProduct}
                  />
                </>
              ))}
            </div>
          ) : (
            <div className="m-auto">
              <Button variant="main" onClick={() => navigate("/menu")}>
                Order now
              </Button>
            </div>
          )}
        </section>
        {/** Order Summary */}
        <OrderSummary
          calculatedOrderTotal={calculatedOrderTotal}
          calculatedSubtotal={calculatedSubtotal}
        />
      </section>
      <section className="min-h-fit h-fit w-full relative z-0">
        {/* Background */}
        <div
          className="absolute inset-0 z-0 rounded-lg"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000",
          }}
        />
        {/* <div className="absolute inset-0 z-0 rounded-lg bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_rgba(249,_115,_22,_0.25),_transparent_70%),_#000000]" /> */}

        {/* Content */}
        <div className="relative z-10 p-10">
          <p className="text-milky-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
            animi...
          </p>
        </div>
      </section>
    </main>
  );
}

export default CartPage;

export function InfoIcon({ message, icon, className }: InfoIconProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          className={cn(
            "inline-flex items-center justify-center cursor-help",
            className
          )}
        >
          {icon ?? <Info className="h-4 w-4 text-muted-foreground" />}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="text-sm max-w-xs">
        {message}
      </HoverCardContent>
    </HoverCard>
  );
}

function CartProductCard({
  cartProduct,
  onCartProductClick,
  onCartProductQuantityChange,
  onDeleteCartProduct,
}: CartProductCardProps) {
  return (
    <div className="flex border-1 gap-2 lg:gap-7 rounded-lg border-raisin-black-muted/50 p-1 lg:p-5">
      <img
        onClick={onCartProductClick}
        className="size-25 h-fit lg:size-48 object-cover rounded-lg hover:cursor-pointer"
        src={cartProduct.img_url}
        alt={cartProduct.product_name}
      />
      {/** cart product details */}
      <div className="grow flex flex-col justify-between">
        {/** title and price */}
        <div className="flex justify-between">
          <h2
            className="text-blackhole hover:text-golden-brown text-lg md:text-2xl lg:text-3xl font-bold grow hover:cursor-pointer transition-all duration-500"
            onClick={onCartProductClick}
          >
            {cartProduct.product_name}
          </h2>
          <span className="text-blackhole font-semibold text-lg md:text-2xl lg:text-3xl w-fit text-end">
            {/* {PESOSIGN} */}
            {formattedCurrency(
              cartProduct.price_at_purchase * cartProduct.quantity
            )}
          </span>
        </div>
        {/** product size and category */}
        <div className="flex flex-col">
          <span className="text-raisin-black-muted text-xs lg:text-lg">
            Category:{" "}
            <span className="text-blackhole">
              {capitalizeFirstLetter(cartProduct.product_category)}
            </span>
          </span>
          <span className="text-raisin-black-muted text-xs lg:text-lg">
            Size:{" "}
            <span className="text-blackhole">{cartProduct.product_size}</span>
          </span>
        </div>
        {/** cart product actions */}
        <div className="flex justify-between items-center">
          <QuantityInput
            quantity={cartProduct.quantity}
            showHeader={false}
            onQuantityChange={(newQty) => {
              onCartProductQuantityChange(
                cartProduct.product_id,
                cartProduct.product_size,
                newQty
              );
            }}
            classNames={{
              buttonContainer: "p-0 gap-0",
              button: "w-5 h-7 lg:w-11 lg:h-12",
              quantityText: "text-xs lg:text-2xl",
            }}
          />
          <Button
            asChild
            variant="ghost"
            className="size-fit hover:text-destructive"
            onClick={() => onDeleteCartProduct(cartProduct.product_id)}
          >
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
}

function OrderSummary({
  calculatedOrderTotal,
  calculatedSubtotal,
}: OrderSummaryProps) {
  return (
    <section className="flex flex-col gap-5 bg-milky-white p-5 rounded-xl h-fit min-h-1/2 w-full shadow-xl">
      {/** Coupon */}
      <div className="flex flex-col items-center gap-5 w-full">
        <div>
          <h2 className="text-2xl font-semibold">Coupon code</h2>
          <p className="text-sm font-light text-raisin-black-muted">
            {OrderSummaryTextValues.coupon}
          </p>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Input
            className="border-1 border-raisin-black-muted/50"
            placeholder="Coupon code"
          />
          <Button variant="outline2" className="w-full">
            Apply
          </Button>
        </div>
      </div>
      <Separator />
      {/** Order Summary */}
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between">
            <span className="text-raisin-black-muted">Subtotal</span>
            <span>
              {/* {PESOSIGN}
                  {(100).toFixed(2)} */}
              {formattedCurrency(calculatedSubtotal)}
            </span>
          </div>
          <Separator />
          <div className="flex flex-row justify-between">
            <div className="flex gap-2">
              <span className="text-raisin-black-muted">Delivery estimate</span>
              <InfoIcon message={OrderSummaryTextValues.deliveryEstimate} />
            </div>
            <span>
              {PESOSIGN}
              {MockOrderSummaryValues.deliveryEstimate.toFixed(2)}
            </span>
          </div>
          <Separator />
          <div className="flex flex-row justify-between">
            <div className="flex gap-2">
              <span className="text-raisin-black-muted">Tax</span>
              <InfoIcon message={OrderSummaryTextValues.tax} />
            </div>
            <span>
              {PESOSIGN}
              {MockOrderSummaryValues.tax.toFixed(2)}
            </span>
          </div>
          <Separator />
          <div className="flex flex-row justify-between">
            <span className="text-xl font-semibold">Order total</span>
            <span className="text-xl font-semibold">
              {/* {PESOSIGN}
                  {(100).toFixed(2)} */}
              {formattedCurrency(calculatedOrderTotal)}
            </span>
          </div>
          <Button variant="main">Checkout</Button>
        </div>
      </div>
    </section>
  );
}
