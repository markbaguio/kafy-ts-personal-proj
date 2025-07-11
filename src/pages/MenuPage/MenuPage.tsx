import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function MenuPage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="w-full">
      {/** Ribbon/banner */}
      <div className="w-full bg-light-caramel/30 flex justify-start items-center gap-5 h-[50px] pl-10 ">
        <Button
          className="text-lg font-normal p-0"
          variant="ghost2"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <MenuIcon />
          <span>Menu</span>
        </Button>
        <Button className="text-lg font-normal p-0" variant="ghost2" asChild>
          <Link to="/favorites">
            <span>Favorites</span>
          </Link>
        </Button>
        <Button className="text-lg font-normal p-0" variant="ghost2" asChild>
          <Link to="/favorites">
            <span>Featured</span>
          </Link>
        </Button>
        <Button className="text-lg font-normal p-0" variant="ghost2" asChild>
          <Link to="/favorites">
            <span>Previous</span>
          </Link>
        </Button>
      </div>
      {/** Main */}
      <div className="flex w-full">
        <MenuSidebar
          className={`h-lvh w-[300px] flex flex-col gap-10 py-15 pl-12 ${
            isOpen ? "flex" : "hidden"
          }`}
        />
        {/* <MenuSidebar className="h-lvh w-[300px] flex flex-col gap-10 py-15" /> */}
        <main className="w-full h-lvh p-5 py-15 bg-success-green">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente,
          eligendi.
        </main>
      </div>
    </div>
  );
}

export function MenuSidebar({ className }: React.ComponentProps<"aside">) {
  return (
    // <aside className="h-lvh w-[300px] flex flex-col gap-10 py-5">
    <aside className={cn(className)}>
      <div className="w-full flex flex-col justify-center  gap-4">
        <div className="">
          <span className="text-2xl font-bold">Drinks</span>
        </div>
        <div
          className="flex flex-col gap-1
        "
        >
          {/* <Link to="/menu/hot">Hot</Link>
           */}
          <Button
            className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
            variant="ghost2"
            size="lg"
            asChild
          >
            <Link to="/menu/hot">Hot</Link>
          </Button>
          <Button
            className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
            variant="ghost2"
            size="lg"
            asChild
          >
            <Link to="/menu/hot">Cold</Link>
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center  gap-4">
        <div className="">
          <span className="text-2xl font-bold">Food</span>
        </div>
        <div
          className="text-2xl font-light flex flex-col gap-1
        "
        >
          {/* <Link to="/menu/hot">Hot</Link>
           */}
          <Button
            className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
            variant="ghost2"
            size="lg"
            asChild
          >
            <Link to="/menu/hot">Pastry</Link>
          </Button>
          <Button
            className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
            variant="ghost2"
            size="lg"
            asChild
          >
            <Link to="/menu/hot">Snacks</Link>
          </Button>
          <Button
            className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
            variant="ghost2"
            size="lg"
            asChild
          >
            <Link to="/menu/hot">Lunch</Link>
          </Button>
          <Button
            className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
            variant="ghost2"
            size="lg"
            asChild
          >
            <Link to="/menu/hot">Treats</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
