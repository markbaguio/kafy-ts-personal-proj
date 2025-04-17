import { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function SignInErrorFallback({ resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col justify-center gap-10 items-center h-lvh bg-raisin-black text-milky-white">
      <section className="flex flex-col gap-y-10 justify-center items-center w-1/2 h-1/2">
        <h2 className="text-4xl font-medium">Whoops! Something went wrong.</h2>
        <div className="flex flex-col gap-y-2 justify-center items-center h-fit w-1/2">
          <Button
            variant="outline2"
            className="w-fitoutline-milky-white text-milky-white border-milky-white text-2xl"
            onClick={() => resetErrorBoundary()}
          >
            Retry
          </Button>
          <Button
            variant="outline2"
            className="w-fitoutline-milky-white text-milky-white border-milky-white text-2xl"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </div>
      </section>
    </div>
  );
}
