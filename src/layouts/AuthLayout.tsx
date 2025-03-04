import AuthPageHeader from "@/components/common/AuthPageHeader";
import Footer from "@/components/common/Footer";
import { Outlet } from "react-router";

export default function AuthLayout() {
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
