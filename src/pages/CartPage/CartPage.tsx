import { QuantityInput } from "@/components/common/QuantityInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FREE_SHIPPING_THRESHOLD,
  MockOrderSummaryValues,
  OrderSummaryTextValues,
} from "@/constants";
import {
  calculateOrderTotal,
  calculateSubtotal,
  capitalizeFirstLetter,
  formatCurrency,
} from "@/lib/utils";
import { CartProduct } from "@/models/types";
import { ProductSize } from "@/schemas/MenuProductDetailPage/MenuProductDetailParamsSchema";
import { useCartStore } from "@/store/useCartStore";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PriceSummary from "@/components/common/PriceSummary/PriceSummary";
import { useIsMobile } from "@/hooks/use-mobile";

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

type CartPageOrderSummaryProps = {
  calculatedSubtotal: number;
  calculatedOrderTotal: number;
  // onCheckoutClick: () => void;
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

  const isMobile = useIsMobile();

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

  function handleCheckout(): void {
    navigate("/checkout");
  }

  const [highlightedText, text] = formatCartHeaderSummary(cartProducts.length);

  const calculatedSubtotal = calculateSubtotal(cartProducts);
  const calculatedOrderTotal = calculateOrderTotal({
    subtotal: calculatedSubtotal,
    deliveryEstimate: MockOrderSummaryValues.delivery,
    tax: MockOrderSummaryValues.tax,
  });

  const showFreeShippingNotificationStrip =
    cartProducts.length > 0 &&
    calculatedSubtotal < FREE_SHIPPING_THRESHOLD &&
    calculatedSubtotal !== 0;

  return (
    <main className="w-full bg-off-white-2/50 p-5 lg:px-30 lg:py-10 flex flex-col gap-5">
      {/** Breadcrumb */}
      {isMobile ? (
        <Button
          size="icon"
          variant="ghost"
          className="hover:no-underline
        "
        >
          <ArrowLeft /> Back
        </Button>
      ) : (
        <Breadcrumb>
          <BreadcrumbList className="text-lg text-raisin-black-muted">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      {/** Header */}
      <div className="text-start w-full">
        <h1 className="text-4xl font-bold">Your Cart</h1>
        <span className="text-xl">
          <span className="font-bold">{highlightedText}</span>
          {text}
        </span>
      </div>

      <section className="mx-auto w-full grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-6 h-full">
        {/** Cart Product list and header*/}
        <section className="flex flex-col gap-6">
          {cartProducts.length > 0 ? (
            <div className="w-full bg-milky-white shadow-xl rounded-xl flex flex-col gap-2 p-5 ">
              {cartProducts.map((cartProduct, index) => (
                <React.Fragment
                  key={`${cartProduct.product_id}-${cartProduct.product_size}`}
                >
                  <CartProductCard
                    onCartProductClick={() =>
                      handleCartProductClick(cartProduct.product_id)
                    }
                    onDeleteCartProduct={handleDeleteCartProduct}
                    onCartProductQuantityChange={
                      handleCartProductQuantityChange
                    }
                    cartProduct={cartProduct}
                  />
                  {index !== cartProducts.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="m-auto">
              <Button variant="outline2" onClick={() => navigate("/menu")}>
                Order now
              </Button>
            </div>
          )}
        </section>
        {/** Order Summary */}
        <section className="flex flex-col gap-5">
          <CartPageOrderSummary
            calculatedOrderTotal={calculatedOrderTotal}
            calculatedSubtotal={calculatedSubtotal}
          />
          <Button
            variant="main"
            disabled={cartProducts.length === 0}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
          {/** Free shippig notification strip */}
          {showFreeShippingNotificationStrip && (
            <div className="animate-vibrate bg-golden-brown/80 text-milky-white h-fit w-full p-2 rounded-lg flex flex-col justify-center items-center text-center text-sm lg:text-lg">
              Spend at least {formatCurrency(FREE_SHIPPING_THRESHOLD)} to unlock
              free shipping!
            </div>
          )}
        </section>
      </section>
      <NewsletterBanner />
    </main>
  );
}

export default CartPage;

function NewsletterBanner() {
  return (
    <section className="relative flex flex-col gap-5 justify-center items-center w-full rounded-xl p-5 overflow-hidden bg-[url(src/assets/mike-kenneally-TD4DBagg2wE-unsplash.jpg)] bg-center bg-no-repeat bg-cover">
      <div className="absolute inset-0 bg-royal-brown/50"></div>
      <div className="h-full w-full lg:w-2/3 py-15 px-6 rounded-lg gap-5 bg-off-white/10 backdrop-blur-sm bg-linear-to-br from-off-white/10 to-[#666666]/10 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-milky-white text-lg lg:text-2xl text-center font-semibold">
            Stay in the loop!
          </h2>
          <p className="text-milky-white text-sm lg:text-lg font-light text-center">
            Be the first to know when new drinks drop, rewards launch, or
            exclusive brews go live.
          </p>
        </div>
        <Button
          className="hover:text-golden-brown text-xs lg:text-lg"
          variant="secondary"
        >
          Keep me updated
        </Button>
      </div>
    </section>
  );
}

function CartProductCard({
  cartProduct,
  onCartProductClick,
  onCartProductQuantityChange,
  onDeleteCartProduct,
}: CartProductCardProps) {
  function handleCartProductQuantityChange(newQty: number): void {
    onCartProductQuantityChange(
      cartProduct.product_id,
      cartProduct.product_size,
      newQty
    );
  }
  return (
    <div className="flex gap-2 lg:gap-7 p-1 lg:p-5">
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
            {formatCurrency(cartProduct.unit_price * cartProduct.quantity)}
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
            // onQuantityChange={(newQty) => {
            //   onCartProductQuantityChange(
            //     cartProduct.product_id,
            //     cartProduct.product_size,
            //     newQty
            //   );
            // }}
            onQuantityChange={handleCartProductQuantityChange}
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

function CartPageOrderSummary({
  calculatedOrderTotal,
  calculatedSubtotal,
}: // onCheckoutClick,
CartPageOrderSummaryProps) {
  return (
    <div className="flex flex-col gap-5 bg-milky-white p-5 rounded-xl h-fit min-h-1/2 w-full shadow-xl">
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
      <PriceSummary
        headerText="Order Summary"
        // buttonLabel="Checkout"
        // onButtonClick={onCheckoutClick}
        calculatedSubtotal={calculatedSubtotal}
        calculatedOrderTotal={calculatedOrderTotal}
        showHeader
      />
    </div>
  );
}
