import Loading from "@/components/ui/loading";
import { useAuthStore } from "@/store/useAuthStore";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const isAuthLoading = useAuthStore((state) => state.isLoading);

  console.log("isAuthLoading", isAuthLoading);

  useEffect(() => {
    // Only redirect if loading is done and not signed in
    if (!isAuthLoading && !isSignedIn) {
      const redirectTo = location.pathname;
      const encodedRedirectTo = encodeURIComponent(redirectTo);
      navigate(`/auth/signin?redirect=${encodedRedirectTo}`, { replace: true });
    }
  }, [isAuthLoading, isSignedIn]);

  if (isAuthLoading) {
    return <Loading text="Loading..." />;
  }

  return children;
}

export default ProtectedRoute;
