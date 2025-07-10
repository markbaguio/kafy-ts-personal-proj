import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function Menu() {
  return (
    <div className="w-full">
      {/** Ribbon/banner */}
      <div className="w-full bg-light-caramel/30 flex justify-start items-center gap-5 h-[50px] pl-10 ">
        <Button className="text-lg font-normal p-0" variant="ghost2" asChild>
          <Link to="/favorites">
            <span>Favorites</span>
          </Link>
        </Button>
        <Button className="text-lg font-normal p-0" variant="ghost2" asChild>
          <Link to="/favorites">
            <span>Features</span>
          </Link>
        </Button>
        <Button className="text-lg font-normal p-0" variant="ghost2" asChild>
          <Link to="/favorites">
            <span>Previous</span>
          </Link>
        </Button>
      </div>
      {/** Main */}
      <div className="flex w-full pl-10">
        <MenuSidebar />
        <main className="w-full h-lvh p-5 bg-success-green">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente,
          eligendi.
        </main>
      </div>
    </div>
  );
}

export function MenuSidebar() {
  return (
    <aside className="h-lvh w-[300px] flex flex-col justify-center gap-10">
      <div className="w-full flex flex-col justify-center  gap-4">
        <div className="">
          <span className="text-2xl font-bold">Drinks</span>
        </div>
        <div
          className="text-2xl font-light flex flex-col gap-1
        "
        >
          {/* <Link to="/menu/hot">Hot</Link>
           */}
          <Button
            className="w-full p-0 text-2xl font-light justify-start"
            variant="ghost2"
            size="lg"
            asChild
          >
            <Link to="/menu/hot">Hot</Link>
          </Button>
          <Button
            className="w-full p-0 text-2xl font-light justify-start"
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
            className="w-full p-0 text-2xl font-light justify-start"
            variant="ghost2"
            size="lg"
            asChild
          >
            <Link to="/menu/hot">Pastry</Link>
          </Button>
          <Button
            className="w-full p-0 text-2xl font-light justify-start"
            variant="ghost2"
            size="lg"
            asChild
          >
            <Link to="/menu/hot">Snacks</Link>
          </Button>
          <Button
            className="w-full p-0 text-2xl font-light justify-start"
            variant="ghost2"
            size="lg"
            asChild
          >
            <Link to="/menu/hot">Lunch</Link>
          </Button>
          <Button
            className="w-full p-0 text-2xl font-light justify-start"
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
