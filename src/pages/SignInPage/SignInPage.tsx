import { AuthErrorFallback } from "@/components/common/AuthErrorFallback";
import { LoginForm } from "@/components/ui/login-form";
import { ErrorBoundary } from "react-error-boundary";

export function SignInPage() {
  return (
    <ErrorBoundary FallbackComponent={AuthErrorFallback}>
      <div className="flex flex-col-reverse md:flex-row md:justify-center w-full h-full min-h-screen">
        <div className="flex flex-col items-center justify-center p-5 w-full md:w-[50%] bg-light-caramel">
          <LoginForm />
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-[50%] bg-raisin-black">
          {/* <Logo darkBg={true} /> */}
          <p className="font-light text-milky-white text-center text-sm md:text-4xl p-5 ">
            Sign up now and start earning Kafy Coins with every purchase!
          </p>
        </div>
      </div>
    </ErrorBoundary>
  );
}
