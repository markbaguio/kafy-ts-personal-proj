import { Button } from "@/components/ui/button";
import { MenuSidebarCategories, PESOSIGN } from "@/constants";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Coffee, Heart } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/loading";
import { createGetProductMenuQueryOptions } from "@/queryOptions/createGetProductMenuQueryOptions";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  MenuCategoryType,
  useMenuPageSearchParams,
} from "@/hooks/useMenuPageSearchParams";
import { AddToFavoritePayload, Product } from "@/models/types";
import { addToFavorite } from "@/services/productService";
import { createGetUserFavoritesQueryOptions } from "@/queryOptions/createGetUserFavoritesQueryOptions";

export default function MenuPage() {
  const { page, category, setSearchParams } = useMenuPageSearchParams();

  const { data, isLoading } = useQuery(
    createGetProductMenuQueryOptions(
      {
        page: page,
        category: category,
      },
      {
        retry: 1,
        refetchOnWindowFocus: true,
        throwOnError: true,
      }
    )
  );

  const { data: favoriteProductsData, error: favoriteProductsError } = useQuery(
    createGetUserFavoritesQueryOptions({
      refetchOnWindowFocus: true,
      retry: 1,
    })
  );

  const favoritesArray =
    favoriteProductsData?.data?.map((favorite) => favorite.product_id) ?? [];

  //TODO: Continue working on the favorites feature.
  //TODO: render favorite products correctly. If product is favorite = favorite button is enabled/filled.
  //TODO: Add constraint to the favorites table for duplicated values. Add unique on the product id and user_id

  console.log("favorite products: ", favoriteProductsData?.data);

  const { mutate: addToFavoritesMutate } = useMutation({
    mutationFn: (id: AddToFavoritePayload) => addToFavorite(id),
  });

  const currentPage = data?.data?.pagination.currentPage ?? 1;
  const hasNextPage = data?.data?.pagination.hasNextPage ?? false;

  function handleToggleFavorite(product_id: number) {
    // console.log(product_id);
    // addToFavoritesMutate({ id: product_id }); //? comment out for dev
  }

  function handleCategoryChange(category: MenuCategoryType) {
    setSearchParams({ category, page: "1" });
  }

  function handlePaginationNextPageClick() {
    const nextPage = (data?.data?.pagination.currentPage ?? 1) + 1;
    setSearchParams({ category: category, page: String(nextPage) });
  }

  function handlePaginationPreviousPageClick() {
    const nextPage = (data?.data?.pagination.currentPage ?? 1) - 1;
    setSearchParams({ category: category, page: String(nextPage) });
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
                        isActive={item.name === category}
                        onClick={() => handleCategoryChange(item.name)}
                        className={cn(
                          `hover:text-golden-brown text-lg ${
                            item.name == category && "!text-golden-brown"
                          }`
                        )}
                      >
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
                    <Link to="/menu/favorites">Favorites</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className={"hover:text-golden-brown text-lg"}
                  >
                    <Link to="/test">Featured</Link>
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
            {data?.data?.products.map((product) => {
              const isFavorited = favoritesArray.includes(product.id);

              console.log("product_id: ", product.id, isFavorited);
              return (
                <MenuCardItem
                  key={product.id}
                  product={product}
                  handleToggleFavorite={handleToggleFavorite}
                  isFavorited={isFavorited}
                />
              );
            })}
          </div>
        )}
        <div className="w-full flex justify-center py-5">
          <MenuPagePagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            onNextPageClick={handlePaginationNextPageClick}
            onPreviousPageClick={handlePaginationPreviousPageClick}
          />
        </div>
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
  isFavorited: boolean;
};

export function MenuCardItem({
  product,
  handleToggleFavorite: toggleFavorite,
  isFavorited,
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
            isFavorited={isFavorited}
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
  isFavorited: boolean;
};

function FavoriteButton({
  price,
  handleToggle,
  isFavorited,
  ...props
}: FavoriteButtonProps & React.ComponentProps<"button">) {
  // const isFavorited = price >= 90 && price <= 140;
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

type MenuPagePaginationProps = {
  currentPage: number;
  hasNextPage: boolean;
  onPreviousPageClick: () => void;
  onNextPageClick: () => void;
};

function MenuPagePagination({
  currentPage,
  hasNextPage,
  onNextPageClick,
  onPreviousPageClick,
}: MenuPagePaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            // disabled={data?.data?.pagination.currentPage! <= 1}
            disabled={currentPage <= 1}
          >
            <PaginationPrevious onClick={onPreviousPageClick} />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="ghost"
            // disabled={data?.data?.pagination.hasNextPage === false}
            disabled={!hasNextPage}
          >
            <PaginationNext onClick={onNextPageClick} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
