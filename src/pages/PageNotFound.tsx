import { Button } from "@/components/ui/button";
import { PageNotFoundText } from "@/constants";
import PageNotFoundSVG from "@/assets/PageNotFound/undraw_page-eaten_b2rt.svg";
import { useNavigate } from "react-router";

export function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen bg-milky-white">
      <img
        src={PageNotFoundSVG}
        className="w-full lg:w-1/2 h-1/2"
        alt="Page not found svg."
      />
      <div className="flex flex-col h-fit items-center gap-0 p-0">
        <h1 className="text-lg/4 md:text-xl lg:text-4xl/4 font-bold text-center mb-4">
          {PageNotFoundText.header}
        </h1>
        <p className="text-sm/4 lg:text-lg/4 text-center  mb-6">
          {PageNotFoundText.description}
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="main" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    </div>
  );
}
