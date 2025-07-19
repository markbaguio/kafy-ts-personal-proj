import { Button } from "@/components/ui/button";
import {
  MenuItemsMockData,
  MenuSidebarCategories,
  PESOSIGN,
} from "@/constants";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Coffee, Heart } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MockProductCategoryEnum } from "@/models/types";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createGetProductQueryOptions } from "@/queryOptions/createGetProductQueryOptions";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";

export default function MenuPage() {
  return (
    <Suspense fallback={<Loading text="Loading Menu..." />}>
      <MenuPageContent />
    </Suspense>
  );
}

function MenuPageContent() {
  const [searchParams, setSearchParams] = useSearchParams({
    category: "hot",
    page: "1",
  });

  const { data } = useSuspenseQuery(
    createGetProductQueryOptions(
      {
        page: searchParams.get("page") ?? "1",
        catergory: searchParams.get("category") ?? MockProductCategoryEnum.hot,
      },
      {
        retry: 1,
        refetchOnWindowFocus: true,
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
                        // asChild
                        isActive={item.name === searchParams.get("category")}
                        onClick={() =>
                          // setSelectedCategory(
                          //   item.name as MockProductCategoryEnum
                          // )
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
                    <Link to="/menu/favorites">Favorites</Link>
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
        <div className="grid grid-cols-3 gap-6 p-5">
          {MenuItemsMockData.map((product) => (
            <Card
              key={product.id}
              className="relative overflow-hidden h-fit pt-0"
            >
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
                  {/* <Heart className="size-5" /> */}
                  <FavoriteButton
                    handleToggle={handleToggleFavorite}
                    product_id={product.id}
                    price={product.price}
                  />
                </div>
                <CardDescription>
                  <p className="w-full">{product.description}</p>
                </CardDescription>
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
                  <Link to="/">Buy now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
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

// function ProductQuantityStepper() {
//   return (
//     <div className="w-full flex justify-center items-center gap-3">
//       <Button variant="outline2" className="rounded-lg">
//         <Minus />
//       </Button>
//       <span className="text-xl font-semibold">0</span>
//       <Button variant="outline2" className="rounded-lg">
//         <Plus />
//       </Button>
//     </div>
//   );
// }

// export function MenuPage() {
//   function handleCategoryClick(category: string) {
//     console.log(category);
//   }
//   return (
//     <div className="w-full">
//       {/** Ribbon/banner */}
//       <MenuBanner />
//       {/** Main */}
//       <div className="flex w-full">
//         <MenuSidebar
//           className={cn(
//             `h-lvh w-[300px] gap-10 py-15 pl-12 transition-transform duration-100 ease-in-out`,
//             "hidden lg:flex flex-col"
//           )}
//         />
//         <main
//           className={cn(
//             `w-full h-full p-5 py-15 flex flex-wrap gap-20 duration-300`
//             // !isOpen && "ml-[-300px]"
//           )}
//         >
//           <div className="w-full h-fit">
//             <h3 className="text-4xl font-bold">Menu</h3>
//           </div>
//           {/* {MenuItemsMockData.map((menuItem) => (
//             <MenuItemCard key={menuItem.product_id} {...menuItem} />
//           ))} */}
//           {false ? (
//             <p>test</p>
//           ) : (
//             <>
//               <section className="flex flex-col w-full gap-5 ">
//                 <h3 className="text-3xl font-bold">Drinks</h3>
//                 <Separator />
//                 <div className="flex flex-row gap-5">
//                   {MenuDrinkCategories.map((menuCategory) => (
//                     <MenuCategory
//                       handleClick={handleCategoryClick}
//                       key={menuCategory.id}
//                       {...menuCategory}
//                     />
//                   ))}
//                 </div>
//               </section>
//               <section className="flex flex-col w-full gap-5 ">
//                 <h3 className="text-3xl font-bold">Food</h3>
//                 <Separator />
//                 <div className="flex flex-row gap-5">
//                   {MenuFoodCategories.map((menuCategory) => (
//                     <MenuCategory
//                       handleClick={handleCategoryClick}
//                       key={menuCategory.id}
//                       {...menuCategory}
//                     />
//                   ))}
//                 </div>
//               </section>
//             </>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// type MenuCategoryProps = {
//   category: string;
//   img_url: string;
//   handleClick: (category: string) => void;
// };

// export function MenuCategory({
//   category,
//   img_url,
//   handleClick,
// }: MenuCategoryProps) {
//   return (
//     <div
//       className="flex flex-row gap-3 p-3 justify-start items-center w-[400px] hover:bg-raisin-black/20 hover:cursor-pointer duration-500"
//       onClick={() => handleClick(category)}
//     >
//       <img
//         className="w-[150px] h-[150px] rounded-full object-cover"
//         src={img_url}
//         alt={img_url}
//       />
//       <span className="text-2xl font-normal">{category}</span>
//     </div>
//   );
// }

// type MenuBannerProps = {
//   // onToggleSideBar: () => void;
// };

// function MenuBanner({
//   // onToggleSideBar,
//   className,
//   ...props
// }: MenuBannerProps & React.ComponentProps<"div">) {
//   return (
//     <div
//       className={cn(
//         `w-full bg-light-caramel/30 flex justify-start items-center gap-5 h-[50px] pl-10 overflow-x-croll`,
//         className
//       )}
//       {...props}
//     >
//       {/* <Button
//         className="text-lg font-normal p-0"
//         variant="ghost2"
//         // onClick={onToggleSideBar}
//       >
//         <MenuIcon />
//         <span>Menu</span>
//       </Button> */}
//       <Button className="text-lg font-normal p-0" variant="ghost2" asChild>
//         <Link to="/favorites">
//           <span>Favorites</span>
//         </Link>
//       </Button>
//       <Button className="text-lg font-normal p-0" variant="ghost2" asChild>
//         <Link to="/favorites">
//           <span>Featured</span>
//         </Link>
//       </Button>
//       <Button className="text-lg font-normal p-0" variant="ghost2" asChild>
//         <Link to="/favorites">
//           <span>Previous</span>
//         </Link>
//       </Button>
//     </div>
//   );
// }

// export function MenuSidebar({ className }: React.ComponentProps<"aside">) {
//   return (
//     <aside className={cn(className)}>
//       <div className="w-full flex flex-col justify-center">
//         <div className="">
//           <h3 className="text-2xl font-bold">Drinks</h3>
//         </div>
//         <div
//           className="flex flex-col gap-1
//         "
//         >
//           <Button
//             className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
//             variant="ghost2"
//             size="lg"
//             asChild
//           >
//             <Link to="/menu/hot">Hot</Link>
//           </Button>
//           <Button
//             className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
//             variant="ghost2"
//             size="lg"
//             asChild
//           >
//             <Link to="/menu/hot">Cold</Link>
//           </Button>
//         </div>
//       </div>
//       <div className="w-full flex flex-col justify-center  gap-4">
//         <div className="">
//           <h3 className="text-2xl font-bold">Food</h3>
//         </div>
//         <div
//           className="text-2xl font-light flex flex-col gap-1
//         "
//         >
//           {/* <Link to="/menu/hot">Hot</Link>
//            */}
//           <Button
//             className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
//             variant="ghost2"
//             size="lg"
//             asChild
//           >
//             <Link to="/menu/hot">Pastry</Link>
//           </Button>
//           <Button
//             className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
//             variant="ghost2"
//             size="lg"
//             asChild
//           >
//             <Link to="/menu/hot">Snacks</Link>
//           </Button>
//           <Button
//             className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
//             variant="ghost2"
//             size="lg"
//             asChild
//           >
//             <Link to="/menu/hot">Lunch</Link>
//           </Button>
//           <Button
//             className="w-full p-0 text-2xl font-normal text-raisin-black-muted justify-start"
//             variant="ghost2"
//             size="lg"
//             asChild
//           >
//             <Link to="/menu/hot">Treats</Link>
//           </Button>
//         </div>
//       </div>
//     </aside>
//   );
// }

// export function MenuItemCard({
//   product_id,
//   name,
//   image_url,
//   price,
// }: Product & React.ComponentProps<"div">) {
//   function handleToggleFavorite(product_id: number) {
//     console.log("Toggle favorite", product_id);
//   }

//   return (
//     <div
//       className={cn(
//         "bg-milky-white text-raisin-black flex flex-col gap-2 rounded-xl border p-6 py-6 shadow-lg min-w-[300px] max-w-[350px] min-h-[300px] h-fit"
//       )}
//     >
//       {/**card content */}
//       {/**card img */}
//       <div className="bg-success-green overflow-hidden rounded-lg">
//         <img src={image_url} alt={`${image_url}`} />
//       </div>
//       <div className="flex justify-between">
//         {price >= 90 && price <= 140 ? (
//           <Badge
//             variant="outline"
//             className="bg-success-green/20 text-success-green-accent rounded-lg"
//           >
//             Best seller
//           </Badge>
//         ) : (
//           <div></div>
//         )}
//         <FavoriteButton
//           price={price}
//           product_id={product_id}
//           handleToggle={handleToggleFavorite}
//         />
//       </div>
//       <div className="flex flex-col">
//         <h2 className="text-xl/tight font-bold">{name}</h2>
//         <span className=" text-lg/tight font-normal">
//           {PESOSIGN}
//           {price}
//         </span>
//       </div>
//     </div>
//   );
// }

// type FavoriteButtonProps = {
//   price: number;
//   product_id: number;
//   handleToggle: (product_id: number) => void;
// };

// function FavoriteButton({
//   price,
//   handleToggle,
//   product_id,
//   ...props
// }: FavoriteButtonProps & React.ComponentProps<"button">) {
//   const isFavorited = price >= 90 && price <= 140;
//   return (
//     <button
//       type="button"
//       onClick={() =>ro handleToggle(pduct_id)}
//       style={{
//         background: "none",
//         border: "none",
//         padding: 0,
//         cursor: "pointer",
//       }}
//       {...props}
//     >
//       <Heart
//         fill={isFavorited ? "red" : "none"}
//         color={isFavorited ? "red" : "black"}
//       />
//     </button>
//   );
// }
