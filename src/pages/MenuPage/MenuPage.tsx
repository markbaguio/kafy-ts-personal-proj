import { Button } from "@/components/ui/button";
import { MenuItemsMockData, PESOSIGN } from "@/constants";
import { cn } from "@/lib/utils";
import { Heart, MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";

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
        <main className="w-full h-full p-5 py-15 flex flex-wrap gap-5">
          <div className="w-full h-fit">
            <h3 className="text-2xl font-bold">Menu</h3>
          </div>
          {MenuItemsMockData.map((menuItem) => (
            <MenuItemCard key={menuItem.product_id} {...menuItem} />
          ))}
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
          <h3 className="text-2xl font-bold">Drinks</h3>
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
          <h3 className="text-2xl font-bold">Food</h3>
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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductType } from "@/schemas/Menu/MenuItemSchema";

export function MenuItemCard({
  name,
  description,
  image_url,
  price,
}: ProductType & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-milky-white text-raisin-black flex flex-col gap-2 rounded-xl border p-6 py-6 shadow-lg min-w-[300px] max-w-[350px] min-h-[300px] h-fit"
      )}
    >
      {/**card content */}
      {/**card img */}
      <div className="bg-success-green overflow-hidden rounded-lg">
        <img src={image_url} alt={`${image_url}`} />
      </div>
      <div className="flex justify-between">
        {price >= 90 && price <= 140 ? (
          <Badge
            variant="outline"
            className="bg-success-green/20 text-success-green-accent rounded-lg"
          >
            Best seller
          </Badge>
        ) : (
          <div></div>
        )}
        <FavoriteButton price={price} />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl/tight font-bold">{name}</h2>
        <span className=" text-lg/tight font-normal">
          {PESOSIGN}
          {price}
        </span>
      </div>
    </div>
  );
}

type FavoriteButtonProps = {
  price: number;
};

function FavoriteButton({
  price,
  ...props
}: FavoriteButtonProps & React.ComponentProps<"svg">) {
  const isFavorited = price >= 90 && price <= 140;
  return (
    <Heart
      fill={isFavorited ? "red" : "none"}
      color={isFavorited ? "red" : "black"}
      {...props}
    />
  );
}
