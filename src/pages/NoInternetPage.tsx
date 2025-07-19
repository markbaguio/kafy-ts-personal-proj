import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import noInternetSvg from "@/assets/NoInternetPage/undraw_server-down_lxs9.svg"; // Adjust the path as necessary

export function NoInternetPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen bg-milky-white">
      <img
        src={noInternetSvg}
        className="w-full lg:w-1/2 h-1/2"
        alt="No internet svg."
      />
      <div className="flex flex-col h-fit items-center gap-0 p-0">
        <h1 className="text-lg/4 md:text-xl lg:text-4xl/4 font-bold text-center mb-4">
          No Internet Connection
        </h1>
        <p className="text-sm/4 lg:text-lg/4 text-center  mb-6">
          Please check your internet connection and try again.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="main" onClick={() => window.location.reload()}>
          Retry
        </Button>
        <Button variant="outline2" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    </div>
  );
}
