import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function Menu() {
  return (
    <div className="w-full">
      {/** Ribbon/banner */}
      <div className="w-full bg-light-caramel/30 p-5 flex justify-start">
        <Button className="text-lg font-normal" variant="ghost2" asChild>
          <Link to="/favorites">
            <span>Favorites</span>
          </Link>
        </Button>
        <Button className="text-lg font-normal" variant="ghost2" asChild>
          <Link to="/favorites">
            <span>Features</span>
          </Link>
        </Button>
        <Button className="text-lg font-normal" variant="ghost2" asChild>
          <Link to="/favorites">
            <span>Previous</span>
          </Link>
        </Button>
      </div>
      {/** Main */}
      <div className="flex w-full">
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
    <aside className="h-lvh w-[300px] p-5">
      <div>
        <span className="text-2xl font-bold">Category</span>
        <Button
          className="w-full text-2xl font-light"
          variant="ghost2"
          size="lg"
          asChild
        >
          <Link to="/hot">Hot</Link>
        </Button>
      </div>
    </aside>
  );
}
