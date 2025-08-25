import { ApiErrorName, FREE_SHIPPING_THRESHOLD } from "@/constants";
import {
  ApiErrorResponse,
  AuthApiErrorDetails,
  AuthSessionMissingErrorDetails,
  UnexpectedErrorDetails,
  ZodErrorDetails,
} from "@/models/ApiResponse";
import { CartProduct } from "@/models/types";
import { ProductSize } from "@/schemas/MenuProductDetailPage/MenuProductDetailParamsSchema";
import { AuthApiError } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthApiErrorMessage(error: AuthApiError): string {
  if (error.code === "invalid_credentials") {
    return "Invalid login credentials";
  } else if (error.code === "user_already_exists") {
    return "This email is already registered";
  } else if (error.code === "email_exists") {
    return "This Email address already exists in the system";
  } else if (error.code === "unexpected_failure") {
    return "An unknown error occurred";
  }
  return "An unknown error occurred";
}

//? TYPEGUARDS
export function isApiErrorResponse(data: any): data is ApiErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.statusCode === "number" &&
    typeof data.message === "string" &&
    typeof data.errorName === "string"
  );
}

export function isZodApiErrorResponse(
  error: unknown
): error is ApiErrorResponse<ZodErrorDetails> {
  return (
    error instanceof ApiErrorResponse &&
    error.errorName === ApiErrorName.ZodError
  );
}

export function isAuthApiErrorResponse(
  error: unknown
): error is ApiErrorResponse<AuthApiErrorDetails> {
  return (
    error instanceof ApiErrorResponse &&
    error.errorName === ApiErrorName.AuthApiError
  );
}

export function isUnexpectedApiErrorResponse(
  error: unknown
): error is ApiErrorResponse<UnexpectedErrorDetails> {
  return (
    error instanceof ApiErrorResponse &&
    error.errorName === ApiErrorName.UnexpectedError
  );
}

export function isAuthSessinoMissingErrorResponse(
  error: unknown
): error is ApiErrorResponse<AuthSessionMissingErrorDetails> {
  return (
    error instanceof ApiErrorResponse &&
    error.name === ApiErrorName.AuthSessionMissingError
  );
}

export function isCartProduct(data: unknown): data is CartProduct {
  return (
    typeof data === "object" &&
    data !== null &&
    "product_id" in data &&
    "product_name" in data &&
    "product_category" in data &&
    "unit_price" in data &&
    "quantity" in data &&
    "product_size" in data &&
    "img_url" in data
  );
}

//? -----------------------------------------------------------------------------------

export function handleZodApiFieldErrors<T extends FieldValues>(
  fieldErrors: Record<string, string[]>,
  setError: UseFormSetError<T>
): void {
  Object.entries(fieldErrors).forEach(([field, messages]) => {
    if (messages.length > 0) {
      setError(field as Path<T>, {
        type: "manual",
        message: messages.join(","),
      });
    }
  });
}

export function capitalizeFirstLetter(value: string) {
  return value.charAt(0).toUpperCase() + String(value).slice(1);
}

export function isValidProductSize(size: string): size is ProductSize {
  return ["S", "M", "L"].includes(size);
}

export function formatCurrency(
  amount: number,
  currency = "PHP",
  locale = "en-PH"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

export function calculateSubtotal(cartProducts: CartProduct[]): number {
  return cartProducts.reduce(
    (total, product) => total + product.unit_price * product.quantity,
    0
  );
}

export function calculateOrderTotal({
  subtotal,
  tax,
  deliveryEstimate,
}: {
  subtotal: number;
  tax: number;
  deliveryEstimate: number;
}): number {
  if (subtotal > FREE_SHIPPING_THRESHOLD) return subtotal + tax;

  return subtotal + (tax + deliveryEstimate);
}
