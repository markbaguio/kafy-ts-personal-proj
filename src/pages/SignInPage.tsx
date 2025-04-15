import { SignInErrorFallback } from "@/components/common/SignInErrorFallback";
import { LoginForm } from "@/components/ui/login-form";
import { ErrorBoundary } from "react-error-boundary";

export function SignInPagge() {
  return (
    <ErrorBoundary FallbackComponent={SignInErrorFallback}>
      <div className="flex flex-col-reverse md:flex-row md:justify-cente w-full h-screen">
        <div className="flex flex-col items-center justify-center p-5 w-full h-full md:w-[50%] bg-light-caramel">
          <LoginForm />
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-[50%] h-fit md:h-full bg-raisin-black">
          {/* <Logo darkBg={true} /> */}
          <p className="font-light text-milky-white text-center text-sm md:text-4xl p-5 ">
            Sign up now and start earning Kaffy Coins with every purchase!
          </p>
        </div>
      </div>
    </ErrorBoundary>
  );
}
