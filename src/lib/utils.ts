import { ApiErrorName } from "@/constants";
import {
  ApiErrorResponse,
  AuthApiErrorDetails,
  UnexpectedErrorDetails,
  ZodErrorDetails,
} from "@/models/ApiResponse";
import { AuthApiError } from "@supabase/supabase-js";
import { clsx, type ClassValue } from "clsx";
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
