import { useRouteError } from "react-router";
import { NoInternetPage } from "./NoInternetPage";
import { AxiosErrorCode } from "@/constants";
import SomethingWentWrongPage from "./SomethingWentWrongPage";
import { PageNotFound } from "./PageNotFound";

// This is a fallback UI for when the route is not found
// or when an error occurs in the route.

export default function ErrorBoundary() {
  const error = useRouteError();
  if (error instanceof Error) {
    if (error.name === AxiosErrorCode.NetworkError) {
      return <NoInternetPage />;
    } else {
      return <SomethingWentWrongPage />;
    }
  }
  //? If page is missing, show a custom 404 page.
  return <PageNotFound />;
}
