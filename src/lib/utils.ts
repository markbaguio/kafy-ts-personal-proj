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
