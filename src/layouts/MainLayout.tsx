import Footer from "@/components/common/Footer";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import { Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useLogoutAuthAsync } from "@/hooks/useLogoutAuthSync";

//TODO: implement broadcast channel to sync signout on all tabs.

export default function MainLayout() {
  useAuth();
  useLogoutAuthAsync();

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
