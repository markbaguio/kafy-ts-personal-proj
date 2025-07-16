import { Button } from "@/components/ui/button";
import { MenuDrinkCategories, MenuFoodCategories, PESOSIGN } from "@/constants";
import { cn } from "@/lib/utils";
import { Heart, MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/schemas/Menu/MenuItemSchema";
import { Separator } from "@/components/ui/separator";

export function MenuPage() {
  // const [isOpen, setIsOpen] = useState<boolean>(true);

  // function handleToggleSidebar() {
  //   setIsOpen((prev) => !prev);
  // }
  return (
    <div className="w-full">
      {/** Ribbon/banner */}
      <MenuBanner />
      {/** Main */}
      <div className="flex w-full">
        <MenuSidebar
          className={cn(
            `h-lvh w-[300px] gap-10 py-15 pl-12 transition-transform duration-100 ease-in-out`,
            // isOpen ? "translate-x-0" : "-translate-x-full"
            // isOpen ? "flex flex-col" : "hidden",
            "hidden lg:flex flex-col"
          )}
        />
        <main
          className={cn(
            `w-full h-full p-5 py-15 flex flex-wrap gap-20 duration-300`
            // !isOpen && "ml-[-300px]"
          )}
        >
          <div className="w-full h-fit">
            <h3 className="text-4xl font-bold">Menu</h3>
          </div>
          {/* {MenuItemsMockData.map((menuItem) => (
            <MenuItemCard key={menuItem.product_id} {...menuItem} />
          ))} */}
          <section className="flex flex-col w-full gap-5 ">
            <h3 className="text-3xl font-bold">Drinks</h3>
            <Separator />
            <div className="flex flex-row gap-5">
              {MenuDrinkCategories.map((menuCategory) => (
                <MenuCategory key={menuCategory.id} {...menuCategory} />
              ))}
            </div>
          </section>
          <section className="flex flex-col w-full gap-5 ">
            <h3 className="text-3xl font-bold">Food</h3>
            <Separator />
            <div className="flex flex-row gap-5">
              {MenuFoodCategories.map((menuCategory) => (
                <MenuCategory key={menuCategory.id} {...menuCategory} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

type MenuCategoryProps = {
  category: string;
  img_url: string;
};

export function MenuCategory({ category, img_url }: MenuCategoryProps) {
  return (
    <div className="flex flex-row gap-3 p-3 justify-start items-center w-[400px] hover:bg-raisin-black/20 hover:cursor-pointer duration-500">
      <img
        className="w-[150px] h-[150px] rounded-full object-cover"
        src={img_url}
        alt={img_url}
      />
      <span className="text-2xl font-normal">{category}</span>
    </div>
  );
}

type MenuBannerProps = {
  // onToggleSideBar: () => void;
};

function MenuBanner({
  // onToggleSideBar,
  className,
  ...props
}: MenuBannerProps & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        `w-full bg-light-caramel/30 flex justify-start items-center gap-5 h-[50px] pl-10 overflow-x-croll`,
        className
      )}
      {...props}
    >
      {/* <Button
        className="text-lg font-normal p-0"
        variant="ghost2"
        // onClick={onToggleSideBar}
      >
        <MenuIcon />
        <span>Menu</span>
      </Button> */}
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
  );
}

export function MenuSidebar({ className }: React.ComponentProps<"aside">) {
  return (
    <aside className={cn(className)}>
      <div className="w-full flex flex-col justify-center">
        <div className="">
          <h3 className="text-2xl font-bold">Drinks</h3>
        </div>
        <div
          className="flex flex-col gap-1
        "
        >
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

export function MenuItemCard({
  product_id,
  name,
  image_url,
  price,
}: ProductType & React.ComponentProps<"div">) {
  function handleToggleFavorite(product_id: number) {
    console.log("Toggle favorite", product_id);
  }

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
        <FavoriteButton
          price={price}
          product_id={product_id}
          handleToggle={handleToggleFavorite}
        />
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
  product_id: number;
  handleToggle: (product_id: number) => void;
};

function FavoriteButton({
  price,
  handleToggle,
  product_id,
  ...props
}: FavoriteButtonProps & React.ComponentProps<"button">) {
  const isFavorited = price >= 90 && price <= 140;
  return (
    <button
      type="button"
      onClick={() => handleToggle(product_id)}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      {...props}
    >
      <Heart
        fill={isFavorited ? "red" : "none"}
        color={isFavorited ? "red" : "black"}
      />
    </button>
  );
}
