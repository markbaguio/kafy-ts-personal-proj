import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateOrderTotal,
  calculateSubtotal,
  capitalizeFirstLetter,
  formattedCurrency,
} from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import { CartProduct } from "@/models/types";
import { TicketPercent } from "lucide-react";
import CustomHoverCardInfoIcon from "@/components/common/CustomHoverCardInfoIcon";
import { ActiveSaleText, MockOrderSummaryValues } from "@/constants";
import PriceSummary from "@/components/common/PriceSummary/PriceSummary";

function CheckoutPage() {
  const [shippingMethod, setShippingMethod] = useState<string>("delivery");
  const cartProducts = useCartStore((state) => state.cartProducts);

  function handleShippingMethodChange(newShippingMethod: string) {
    setShippingMethod(newShippingMethod);
  }

  function handlePlaceOrder() {
    console.log(calculatedOrderTotal);
  }

  const options = [
    {
      value: "delivery",
      id: "delivery",
      htmlFor: "delivery",
      labelName: "Delivery",
    },

    {
      value: "pickup",
      id: "pickup",
      htmlFor: "pickup",
      labelName: "Pick up",
    },
  ];

  const calculatedSubtotal = calculateSubtotal(cartProducts);
  const calculatedOrderTotal = calculateOrderTotal({
    subtotal: calculatedSubtotal,
    tax: MockOrderSummaryValues.tax,
    deliveryEstimate: MockOrderSummaryValues.delivery,
  });

  return (
    <main className="flex flex-col min-h-screen w-full bg-off-white-2/50 divide-y-1">
      <section
        className="bg-milky-white min-h-fit w-full flex flex-col gap-5 px-10 py-5 xl:px-30 lg:py-10
      "
      >
        <CheckoutBreadcrumb />
        <h1 className="text-blackhole text-4xl font-bold">Checkout</h1>
      </section>
      <section className="divide-x-1 h-screen grid grid-cols-1 xl:grid-cols-2 w-full">
        {/** Shipping Information*/}
        <div className="bg-milky-white px-10 xl:px-30 py-5">
          <div className=" min-h-[450px] h-fit">
            <form className="flex flex-col gap-5">
              <h2 className="text-2xl font-semibold">Shipping Information</h2>
              {/** First name */}
              <div className="space-y-1">
                <Label className="relative w-fit font-semibold before:content-['*'] before:absolute before:-top-1 before:-right-2 before:text-destructive">
                  First name
                </Label>
                <Input placeholder="First name" />
              </div>
              {/** Last name */}
              <div className="space-y-1">
                <Label className="relative w-fit font-semibold before:content-['*'] before:absolute before:-top-1 before:-right-2 before:text-destructive">
                  Last name
                </Label>
                <Input placeholder="Last name" />
              </div>
              {/** Email Address */}
              <div className="space-y-1">
                <Label className="relative w-fit font-semibold before:content-['*'] before:absolute before:-top-1 before:-right-2 before:text-destructive">
                  Email Address
                </Label>
                <Input placeholder="Email Address" />
              </div>
              {/** Email Address */}
              <div className="space-y-1">
                <Label className="relative w-fit font-semibold before:content-['*'] before:absolute before:-top-1 before:-right-2 before:text-destructive">
                  Phone number
                </Label>
                <Input placeholder="Phone number" />
              </div>
              {/** Email Address */}
              <div className="space-y-1">
                <Label className="relative w-fit font-semibold before:content-['*'] before:absolute before:-top-1 before:-right-2 before:text-destructive">
                  Address
                </Label>
                <Input placeholder="Address" />
              </div>
              {/** Shipping method */}
              <div className="flex flex-col gap-5">
                <span className="text-2xl font-semibold">Shipping Method</span>
                <RadioGroup
                  defaultValue={shippingMethod}
                  className="flex justify-start"
                >
                  <div
                    className={`flex items-center space-x-2 w-full min-h-fit p-5 rounded-xl border-1 border-raisin-black hover:bg-raisin-black-muted/10 hover:text-golden-brown hover:cursor-pointer ${
                      shippingMethod === "delivery" ? "bg-golden-brown" : null
                    }`}
                    onClick={() => handleShippingMethodChange("delivery")}
                  >
                    <RadioGroupItem
                      value="delivery"
                      id="delivery"
                      className=" hover:cursor-pointer"
                    />
                    <Label htmlFor="delivery" className="hover:cursor-pointer">
                      Delivery
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-2 w-full min-h-fit p-5 rounded-xl border-1 border-raisin-black hover:bg-raisin-black-muted/10 hover:text-golden-brown hover:cursor-pointer"
                    onClick={() => handleShippingMethodChange("pickup")}
                  >
                    <RadioGroupItem
                      value="pickup"
                      id="pickup"
                      className=" hover:cursor-pointer"
                    />
                    <Label htmlFor="pickup" className="hover:cursor-pointer">
                      Pick up
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </form>
          </div>
        </div>
        {/** Checkout Page Order Summary */}
        <div className="bg-milky-white/50 min-h-screen px-10 xl:px-30 py-5 flex flex-col gap-5">
          <span className="text-2xl font-semibold">Cart Summary</span>
          {/** Products */}
          <div className="flex flex-col gap-1">
            {cartProducts.map((cartProduct) => (
              <CheckoutProductSummaryCard
                key={`${cartProduct.product_id}-${cartProduct.product_size}`}
                cartProduct={cartProduct}
              />
            ))}
          </div>
          {/** Active sale */}
          <div className="flex items-center justify-between bg-milky-white text-sm font-semibold shadow-lg rounded-xl p-5">
            <div className="flex gap-2 items-center w-full">
              <span className="bg-success-green-accent/20 rounded-full p-2">
                <TicketPercent className="text-success-green" />
              </span>
              <span className="flex items-center gap-1">
                Active Sale{" "}
                <CustomHoverCardInfoIcon message={ActiveSaleText.info} />
              </span>
            </div>
            <span className="text-xs text-end text-raisin-black-muted w-full">
              {ActiveSaleText.activeSale}
            </span>
          </div>
          {/** Calculations */}
          <PriceSummary
            buttonLabel="Place Order"
            calculatedOrderTotal={calculatedOrderTotal}
            calculatedSubtotal={calculatedSubtotal}
            onButtonClick={handlePlaceOrder}
          />
        </div>
      </section>
    </main>
  );
}

export default CheckoutPage;

function CheckoutBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-lg text-raisin-black-muted">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/checkout">Checkout</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

type CheckoutProductSummaryCardProps = {
  cartProduct: CartProduct;
};

export function CheckoutProductSummaryCard({
  cartProduct,
}: CheckoutProductSummaryCardProps) {
  return (
    <div className="w-full bg-milky-white border-2 shadow-lg rounded-xl flex gap-2 p-3">
      <div className="relative">
        <img
          className="size-25 object-cover rounded-lg"
          src={cartProduct.img_url}
          alt={cartProduct.img_url}
        />
        <span className="flex items-center justify-center absolute min-w-7 h-7 -top-1 -right-1 bg-raisin-black text-xs text-milky-white rounded-full">
          {cartProduct.quantity}
        </span>
      </div>
      {/** item info */}
      <div className="flex justify-between w-full">
        <div className="flex flex-col h-full w-1/2">
          <span className="text-blackhole text-lg font-semibold">
            {cartProduct.product_name}
          </span>
          <span className="text-raisin-black-muted text-sm">
            Category:{" "}
            <span className="text-blackhole">
              {capitalizeFirstLetter(cartProduct.product_category)}
            </span>
          </span>
          <span className="text-raisin-black-muted text-sm">
            Size:{" "}
            <span className="text-blackhole">
              {capitalizeFirstLetter(cartProduct.product_size)}
            </span>
          </span>
        </div>
        {/** unit price */}
        <div className="w-1/2 flex justify-end">
          <span className="min-w-[2ch] text-lg font-semibold">
            {formattedCurrency(cartProduct.unit_price)}
          </span>
        </div>
      </div>
      {/* <span className="absolute -top-1 -right-2 bg-raisin-black text-milky-white rounded-full hover:bg-destructive hover:cursor-pointer duration-500">
        <CircleX />
      </span> */}
    </div>
  );
}
