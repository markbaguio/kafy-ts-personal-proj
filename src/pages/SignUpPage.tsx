import { ErrorBoundary } from "react-error-boundary";
import { AuthErrorFallback } from "@/components/common/AuthErrorFallback";
import SignUpForm from "@/components/common/SignUpForm";

export default function SignUpPage() {
  return (
    <ErrorBoundary FallbackComponent={AuthErrorFallback}>
      <section>
        <SignUpForm />
      </section>
    </ErrorBoundary>
  );
}
