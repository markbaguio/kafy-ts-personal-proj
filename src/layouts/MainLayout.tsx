import Footer from "@/components/common/Footer";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";

//TODO: Add tanstack-query useQuery hook for the useAuthStore.
//TODO: Implement a simple isSignedIne in the usAuthStore or a hook.

export default function MainLayout() {
  //TODO: check kung anong error code yung sinesend ng backend kapag walang access_token/walang cookie yung request sa /auth/me
  useAuth();

  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  console.log(isSignedIn);
  // const profile = useAuthStore((state) => state.profile);
  // console.log("Main layout useAuthStore:", profile);

  return (
    <ErrorBoundary fallback={<div>Miau</div>}>
      <div className="flex flex-col">
        <PageHeader />
        <main className="flex grow justify-center items-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
