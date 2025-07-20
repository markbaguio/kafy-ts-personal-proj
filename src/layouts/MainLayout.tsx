import Footer from "@/components/common/Footer";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useLogoutAuthAsync } from "@/hooks/useLogoutAuthSync";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { NoInternetPage } from "@/pages/NoInternetPage";

//TODO: implement broadcast channel to sync signout on all tabs.

export default function MainLayout() {
  useAuth();
  useLogoutAuthAsync();

  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return <NoInternetPage />;
  }

  return (
    <div className="flex flex-col">
      <PageHeader />
      <main className="flex grow justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
