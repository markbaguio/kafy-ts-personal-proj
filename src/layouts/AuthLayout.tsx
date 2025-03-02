import Footer from "@/components/common/Footer";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex">
      <AuthLayout />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
