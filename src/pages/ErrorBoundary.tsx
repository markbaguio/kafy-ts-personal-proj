import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { Link, useRouteError } from "react-router";
import { NoInternetPage } from "./NoInternetPage";
import { AxiosErrorCode } from "@/constants";

// This is a fallback UI for when the route is not found
// or when an error occurs in the route.
//! Check why there is still pagination in the ApiResponse type when you remove it in the ApiResponse.ts file.

export default function ErrorBoundary() {
  const error = useRouteError();
  if (error instanceof Error) {
    console.log("NotFoundPage error:", error.name);
    if (error.name === AxiosErrorCode.NetworkError) {
      return <NoInternetPage />;
    } else if (error.name === "ZodError") {
      //? Add something went wrong error page. para sa lahat ng error??
      return <div>Something went wrong.</div>;
    }
  }

  //? If page is missing, show a custom 404 page.
  return (
    <div className='bg-[url("/img/rizky-subagja-1k7TnX5GAww-unsplash.jpg")] p-5 md:p-20 h-screen bg-cover flex flex-col gap-10 items-center justify-center'>
      <Link to="/">
        <Logo darkBg classname="text-9xl" />
      </Link>
      <div className="border border-off-white w-full max-w-[850px] h-fit py-15 px-6 gap-5 md:gap-8 bg-off-white/10 backdrop-blur-md bg-linear-to-br from-off-white/10 to-[#666666]/10  rounded-[50px] flex items-center justify-center flex-col">
        <h1 className="text-off-white text-2xl md:text-4xl lg:text-6xl text-center md:leading-[57px] tracking-tighter">
          Hold Tight-We're Building Something Cool!
        </h1>
        <p className="text-off-white text-center font-light text-sm md:text-xl lg:text-2xl md:leading-[57px] tracking-tighter">
          This page is currently under construction, but we’re working hard to
          make it worth the wait. Stay tuned for updates!
        </p>
        <Button
          asChild
          variant="outline"
          className="w-[150px] text-off-white border-off-white hover:bg-off-white/20"
        >
          <Link to="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
