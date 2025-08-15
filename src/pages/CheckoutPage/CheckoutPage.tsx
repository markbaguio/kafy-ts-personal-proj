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
import { CartProduct, ShippingInformationType } from "@/models/types";
import { ArrowLeft, Box, CheckIcon, TicketPercent, Truck } from "lucide-react";
import CustomHoverCardInfoIcon from "@/components/common/CustomHoverCardInfoIcon";
import {
  ActiveSaleText,
  AxiosErrorCode,
  MockOrderSummaryValues,
  SomethingWenWrongText,
} from "@/constants";
import PriceSummary from "@/components/common/PriceSummary/PriceSummary";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Controller,
  useForm,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingInformationSchema } from "@/schemas/ShippingInformationSchema/ShippingInformationSchema";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { placeOrder } from "@/services/placeOrderService";
import { createPlaceOrderPayload } from "@/lib/createPlaceOrderPayload";
import { ApiErrorResponse } from "@/models/ApiResponse";

type ShippingFormFieldProps = {
  label: string;
  name: keyof ShippingInformationType;
  placeholder: string;
};

const shipping = [
  {
    name: "Delivery",
    value: "delivery",
    description: "test",
    icon: <Truck />,
  },
  {
    name: "Pickup",
    value: "pickup",
    description: "test",
    icon: <Box />,
  },
];

function CheckoutPage() {
  const cartProducts = useCartStore((state) => state.cartProducts);
  const methods = useForm<ShippingInformationType>({
    resolver: zodResolver(ShippingInformationSchema),
    mode: "onChange",
    defaultValues: {
      shippingMethod: "delivery",
    },
  });

  const isMobile = useIsMobile();

  const placeOrderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: (response) => {
      console.log(response.data?.id);
    },
    onError: (error) => {
      if (error instanceof ApiErrorResponse) {
        if (error.errorName === AxiosErrorCode.NetworkError) {
          toast.warning(`${error.message}`, {
            style: {
              color: "#800000",
            },
          });
          return;
        }
      }

      toast.warning(
        `${SomethingWenWrongText.header} ${SomethingWenWrongText.description}`,
        {
          style: {
            color: "#800000",
          },
        }
      );
    },
  });

  const calculatedSubtotal = calculateSubtotal(cartProducts);
  const calculatedOrderTotal = calculateOrderTotal({
    subtotal: calculatedSubtotal,
    tax: MockOrderSummaryValues.tax,
    deliveryEstimate: MockOrderSummaryValues.delivery,
  });

  const shippingInformationFormID = "shippingInformationForm";

  function onSubmit(data: ShippingInformationType) {
    //? shipping information data is a simulated additional information and is not being sent to the backend.
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(data);

    const result = createPlaceOrderPayload(cartProducts);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    console.log("parsed payload: ", result.data);
    placeOrderMutation.mutate(result.data);
    // console.log("parsed payload: ", parsedPlaceOrderPayload.data);
    // placeOrderMutation.mutate(parsedPlaceOrderPayload.data);
  }

  return (
    <main className="flex flex-col min-h-screen w-full bg-off-white-2/50 divide-y-1">
      <section
        className="bg-milky-white min-h-fit w-full flex flex-col gap-5 px-10 py-5 xl:px-30 lg:py-10
      "
      >
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
          <CheckoutBreadcrumb />
        )}
        <h1 className="text-blackhole text-4xl font-bold">Checkout</h1>
      </section>
      <section className="divide-x-1 min-h-screen grid grid-cols-1 xl:grid-cols-2 w-full">
        {/** Shipping Information*/}
        <div className="bg-milky-white px-10 xl:px-30 py-5">
          <div className=" min-h-[450px] h-fit">
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-5"
                onSubmit={methods.handleSubmit(onSubmit)}
                id={shippingInformationFormID}
              >
                {/** Form inputs */}
                <h2 className="text-2xl font-semibold">Shipping Information</h2>
                <div className="flex flex-col lg:flex-row justify-evenly gap-2">
                  <ShippingFormField
                    label="First name"
                    name="firstName"
                    placeholder="First name"
                  />
                  <ShippingFormField
                    label="Last name"
                    name="lastName"
                    placeholder="Last name"
                  />
                </div>

                <ShippingFormField
                  label="Email"
                  name="email"
                  placeholder="Email"
                />
                <ShippingFormField
                  label="Phone number"
                  name="phoneNumber"
                  placeholder="Phone number"
                />
                <ShippingFormField
                  label="Address"
                  name="address"
                  placeholder="Address"
                />

                {/** Shipping method */}
                <div className="flex flex-col gap-5">
                  <span className="text-2xl font-semibold">
                    Shipping Method
                  </span>
                  <Controller
                    control={methods.control}
                    name="shippingMethod"
                    render={({ field }) => (
                      <RadioGroup
                        className="flex flex-row gap-2"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {shipping.map((method) => (
                          <div
                            key={method.name}
                            className="relative flex items-center gap-3 w-full "
                          >
                            <RadioGroupItem
                              className="peer sr-only"
                              value={method.value}
                              id={method.value}
                            />
                            <Label
                              htmlFor={method.value}
                              className="flex items-center gap-2 justify-start border rounded-xl px-6 py-4 cursor-pointer w-full peer-data-[state=checked]:bg-raisin-black peer-data-[state=checked]:text-milky-white  transition-all duration-500 hover:bg-raisin-black/80 hover:text-milky-white
                              peer-focus-visible:ring-2 peer-focus-visible:ring-raisin-black-muted"
                            >
                              <div className="flex items-center gap-3">
                                {method.icon}
                                <span>{method.name}</span>
                              </div>
                            </Label>
                            <CheckIcon className="absolute bg-milky-white rounded-full  right-3 text-raisin-black p-1 opacity-0 peer-data-[state=checked]:opacity-100" />
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
        {/** Checkout Page Order Summary */}
        <div className="bg-milky-white/50 h-full px-10 xl:px-30 py-5 flex flex-col gap-5">
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
                <TicketPercent className="text-success-green size-5" />
              </span>
              <span className="flex items-center gap-1 text-xs">
                Active Sale{" "}
                <CustomHoverCardInfoIcon message={ActiveSaleText.info} />
              </span>
            </div>
            <span className="text-[10px] text-end text-raisin-black-muted w-full">
              {ActiveSaleText.activeSale}
            </span>
          </div>
          {/** Calculations */}
          <PriceSummary
            calculatedOrderTotal={calculatedOrderTotal}
            calculatedSubtotal={calculatedSubtotal}
          />
          <Button
            disabled={
              methods.formState.isSubmitting || cartProducts.length <= 0
            }
            variant="main"
            type="submit"
            form={shippingInformationFormID}
          >
            Place Order
          </Button>
        </div>
      </section>
    </main>
  );
}

export default CheckoutPage;

function ShippingFormField({
  label,
  name,
  placeholder,
}: ShippingFormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="space-y-1 w-full">
      <Label className="relative w-fit font-semibold before:content-['*'] before:absolute before:-top-1 before:-right-2 before:text-destructive">
        {label}
      </Label>
      <Input
        placeholder={placeholder}
        {...register(name)}
        className={`${
          error
            ? "focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive border-destructive"
            : "focus-visible:border-success-green focus-visible:ring-success-green"
        }`}
      />
      {typeof error?.message === "string" && (
        <span className="text-destructive text-[12px] text-start">
          {error.message}
        </span>
      )}
    </div>
  );
}

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
