import { Button } from "@/components/ui/button";
import { MenuSidebarCategories, PESOSIGN } from "@/constants";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Coffee, Heart } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MockProductCategoryEnum, Product } from "@/models/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { createGetProductQueryOptions } from "@/queryOptions/createGetProductQueryOptions";
import Loading from "@/components/ui/loading";

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    category: "hot",
    page: "1",
  });

  const { data, isLoading } = useQuery(
    createGetProductQueryOptions(
      {
        page: searchParams.get("page") ?? "1",
        catergory: searchParams.get("category") ?? MockProductCategoryEnum.hot,
      },
      {
        retry: 1,
        refetchOnWindowFocus: true,
        throwOnError: true,
      }
    )
  );

  console.log("Data from query:", data);

  function handleToggleFavorite(product_id: number) {
    console.log(product_id);
  }

  return (
    <SidebarProvider>
      <Sidebar className="relative h-full">
        <SidebarHeader className="pb-5">
          <div className="flex flex-row gap-3 justify-start items-center px-2 w-full ">
            <Coffee size={30} className="text-raisin-black" />
            <div className="flex flex-col">
              <h3 className="text-lg/tight font-bold">Kafy</h3>
              <p className="text-sm/tight font-light">Menu</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="">
          {MenuSidebarCategories.map((mc) => (
            <SidebarGroup className="" key={mc.id}>
              <SidebarGroupLabel className="text-3xl font-semibold py-5">
                {mc.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mc.items.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        isActive={item.name === searchParams.get("category")}
                        onClick={() =>
                          setSearchParams({ category: item.name, page: "1" })
                        }
                        className={cn(
                          `hover:text-golden-brown text-lg ${
                            item.name == searchParams.get("category") &&
                            "!text-golden-brown"
                          }`
                        )}
                      >
                        {/* <Link to={`/menu?category=${item.name}`}>
                          {capitalizeFirstLetter(item.name)}
                        </Link> */}
                        {capitalizeFirstLetter(item.name)}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
          <Separator />
          <SidebarGroup>
            <SidebarGroupLabel className="text-3xl font-semibold py-5">
              Highlights
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={"hover:text-golden-brown text-lg"}
                  >
                    <Link to="/">Favorites</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={"hover:text-golden-brown text-lg"}
                  >
                    <Link to="/">Featured</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {/* <SidebarRail /> */}
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 flex md:hidden" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 flex md:hidden"
          />
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Menu</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Coffee Selection</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
          <span className="text-lg font-light">Kafy Coffee Selection</span>
        </header>
        {isLoading ? (
          <MenuLoading />
        ) : (
          <div className="grid grid-cols-3 gap-6 p-5">
            {data?.data?.products.map((product) => (
              <MenuCardItem
                key={product.id}
                product={product}
                handleToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

function MenuLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loading text="Loading Products..." />
    </div>
  );
}

type MenuCardItemProps = {
  product: Product;
  handleToggleFavorite: (product_id: number) => void;
};

export function MenuCardItem({
  product,
  handleToggleFavorite: toggleFavorite,
}: MenuCardItemProps) {
  return (
    <Card key={product.id} className="relative overflow-hidden h-fit pt-0">
      <div className="w-full h-full">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-120 object-cover"
        />
      </div>
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <FavoriteButton
            handleToggle={() => toggleFavorite(product.id)}
            price={product.price}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <span className="font-bold text-xl">
            {PESOSIGN}
            {product.price}
          </span>
          {product.price > 120 && (
            <Badge className="bg-success-green/20 text-success-green-accent rounded-lg">
              Best seller
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="main" className="w-full rounded-lg">
          <Link to={`/menu/${product.id}`}>Buy now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

type FavoriteButtonProps = {
  price: number;
  handleToggle: () => void;
};

function FavoriteButton({
  price,
  handleToggle,
  ...props
}: FavoriteButtonProps & React.ComponentProps<"button">) {
  const isFavorited = price >= 90 && price <= 140;
  return (
    <button
      type="button"
      onClick={handleToggle}
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
