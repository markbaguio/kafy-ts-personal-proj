import Footer from "@/components/common/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="flex flex-col">
      <PageHeader />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
