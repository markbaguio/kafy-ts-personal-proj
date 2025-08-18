import AuthPageHeader from "@/components/common/AuthPageHeader";
import Footer from "@/components/common/Footer";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { NoInternetPage } from "@/pages/NoInternetPage";
import { Outlet } from "react-router";

export default function AuthLayout() {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return <NoInternetPage />;
  }
  return (
    <div className="flex flex-col">
      <AuthPageHeader />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
