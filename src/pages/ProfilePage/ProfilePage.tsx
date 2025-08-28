import { createGetProfileQueryOptions } from "@/queryOptions/createGetProfileQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { CalendarCheck2Icon, User } from "lucide-react";
import ShoppingBagSVG from "@/assets/ProfilePage/shopping-bag-svgrepo-com.svg";
import { Button } from "@/components/ui/button";
import StarSVG from "@/assets/ProfilePage/star-svgrepo-com.svg";
import Logo from "@/components/common/Logo";
import { createGetLatestOrdersQueryOptions } from "@/queryOptions/createGetLatestOrdersQueryOptions";
import { useAuthStore } from "@/store/useAuthStore";
import OrderCard from "@/components/common/OrderCard";
import Loading from "@/components/ui/loading";
import { OrderWithOrderItemsWithImageAndCategory } from "@/models/types";
import { Link } from "react-router";

const latestOrderMock: OrderWithOrderItemsWithImageAndCategory = {
  id: 38,
  total_amount: 480,
  status: "orderPlaced",
  created_at: "2025-08-20T05:59:54.794606+00:00",
  profile_id: "f6f2bde4-8276-4e86-8d90-7138ee7fd516",
  order_items: [
    {
      id: 31,
      created_at: "2025-08-20T05:59:54.869512+00:00",
      product_id: 13,
      product_name: "Black Tea",
      price_at_purchase: 90,
      order_id: 38,
      quantity: 2,
      product_size: "L",
      image_url:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=60&w=800",
      category: "hot",
    },
    {
      id: 32,
      created_at: "2025-08-20T05:59:54.869512+00:00",
      product_id: 7,
      product_name: "Macchiato",
      price_at_purchase: 120,
      order_id: 38,
      quantity: 2,
      product_size: "M",
      image_url:
        "https://images.unsplash.com/photo-1557772611-722dabe20327?auto=format&fit=crop&q=80&w=1887",
      category: "hot",
    },
  ],
};

export default function ProfilePage() {
  const { data } = useQuery(createGetProfileQueryOptions());
  const { data: latestOrder, isLoading: latestOrderIsLoading } = useQuery(
    createGetLatestOrdersQueryOptions(
      { limit: 1 },
      {
        select: (orders) => {
          // Always return an ApiResponse object
          return {
            ...orders,
            data: orders.data && orders.data.length > 0 ? [orders.data[0]] : [],
          };
        },
        refetchOnWindowFocus: false,
        retry: 1,
      }
    )
  );

  const firstName = useAuthStore((state) => state.profile?.first_name);
  const lastName = useAuthStore((state) => state.profile?.last_name);
  const email = useAuthStore((state) => state.profile?.email);
  const joinDateString = useAuthStore((state) => state.profile?.created_at);
  const joinDate = joinDateString
    ? new Date(joinDateString).toLocaleDateString()
    : undefined;

  console.log("latest order: ", latestOrder);

  // return (
  //   <main className="bg-off-white-2/50 flex flex-col p-10 gap-5">
  //     <section className="w-screen gap-5 h-lvh grid grid-cols-1 lg:grid-flow-col lg:grid-cols-3 grid-rows-2 min-h-[850px] max-h-lvh overflow-y-auto">
  //       {/** Profile grid */}
  //       <div className="overflow-hidden bg-milky-white rounded-[30px] shadow-xl row-span-2 col-span-2 lg:col-span-1 flex flex-col gap-10 items-center p-5">
  //         <div className="flex flex-col items-center gap-10 p-15 w-full">
  //           <div className="overflow-hidden  bg-royal-brown/50 rounded-full">
  //             <User className="w-[200px] h-[200px]" />
  //           </div>
  //           <div className="flex flex-col text-center">
  //             <h2 className="text-5xl font-bold">
  //               {firstName || lastName
  //                 ? `${firstName ?? ""} ${lastName ?? ""}`
  //                 : "Anonymous user".trim()}
  //             </h2>
  //             <h6 className="text-md font-light">{email ?? "N/A"}</h6>
  //             {/** //TODO: Continue working on this date */}
  //             <h6 className="text-sm font-extralight">
  //               Joined at <span>{joinDate ?? " N/A"}</span>
  //             </h6>
  //           </div>
  //         </div>
  //         {/** Analytics 1 */}
  //         <div className="bg-off-white-2 border-1 w-full grid grid-rows-2 grid-cols-2 grid-flow-row gap-2 p-5 rounded-[15px]">
  //           <div className="bg-milky-white rounded-[15px] flex flex-row gap-2 p-3">
  //             {data?.data?.avatar_url === null ? (
  //               <img
  //                 className="w-[60px] h-[60px]"
  //                 src={ShoppingBagSVG}
  //                 alt="Shopping bag"
  //               />
  //             ) : (
  //               <img
  //                 className="w-[60px] h-[60px]"
  //                 src={data?.data?.avatar_url}
  //                 alt="Shopping bag"
  //               />
  //             )}

  //             <div className="flex flex-col">
  //               <h5 className="text-xl font-light">Order count</h5>
  //               <p className="text-3xl">22</p>
  //             </div>
  //           </div>
  //           <div className="bg-milky-white rounded-[15px] flex flex-row gap-2 p-3">
  //             <img
  //               className="w-[60px] h-[60px]"
  //               src={ShoppingBagSVG}
  //               alt="Shopping bag"
  //             />
  //             <div className="flex flex-col">
  //               <h5 className="text-xl font-light">Favorites</h5>
  //               <p className="text-3xl">21</p>
  //             </div>
  //           </div>
  //           <div className="bg-milky-white rounded-[15px] flex flex-row gap-2 p-3">
  //             <img
  //               className="w-[60px] h-[60px]"
  //               src={ShoppingBagSVG}
  //               alt="Shopping bag"
  //             />
  //             <div className="flex flex-col">
  //               <h5 className="text-xl font-light">Kafy points</h5>
  //               <p className="text-3xl">50</p>
  //             </div>
  //           </div>
  //           <div className="bg-milky-white rounded-[15px] flex flex-row gap-2 p-3">
  //             <img
  //               className="w-[60px] h-[60px]"
  //               src={ShoppingBagSVG}
  //               alt="Shopping bag"
  //             />
  //             <div className="flex flex-col">
  //               <h5 className="text-xl font-light">Top pick</h5>
  //               <p className="text-3xl underline decoration-burnt-sienna">
  //                 Espresso
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="w-full flex justify-start">
  //           <Button variant={"main"}>Edit profile</Button>
  //         </div>
  //       </div>
  //       {/** More simple Analytics */}
  //       <AnalyticsBentoGrid />
  //     </section>
  //     <div
  //       className="bg-milky-white rounded-[30px] shadow-xl col-span-2 row-span-1
  //     flex items-center justify-center w-full h-full"
  //     >
  //       {/* <OrderHistory /> */}
  //       {latestOrderIsLoading ? (
  //         <Loading />
  //       ) : latestOrder?.data && latestOrder.data.length > 0 ? (
  //         <OrderCard order={latestOrder.data[0]} />
  //       ) : (
  //         <div className="h-full flex items-center justify-center">
  //           <p>No recent order</p>
  //         </div>
  //       )}
  //     </div>
  //   </main>
  // );
  return (
    <main className="bg-off-white-2/50 flex flex-col w-full h-full p-10 gap-5">
      <section className="gap-5 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2">
        {/** Profile grid */}
        <div className="overflow-hidden bg-milky-white rounded-[30px] shadow-xl row-span-2 col-span-2 lg:col-span-1 flex flex-col gap-10 items-center p-5">
          <div className="flex flex-col items-center gap-10 p-15 w-full">
            <div className="overflow-hidden  bg-royal-brown/50 rounded-full">
              <User className="w-[200px] h-[200px]" />
            </div>
            <div className="flex flex-col text-center">
              <h2 className="text-5xl font-bold">
                {firstName || lastName
                  ? `${firstName ?? ""} ${lastName ?? ""}`
                  : "Anonymous user".trim()}
              </h2>
              <h6 className="text-md font-light">{email ?? "N/A"}</h6>
              {/** //TODO: Continue working on this date */}
              <h6 className="text-sm font-extralight">
                Joined at <span>{joinDate ?? " N/A"}</span>
              </h6>
            </div>
          </div>
          {/** Analytics 1 */}
          <div className="bg-off-white-2 border-1 w-full grid grid-rows-2 grid-cols-2 grid-flow-row gap-2 p-5 rounded-[15px]">
            <div className="bg-milky-white rounded-[15px] flex flex-row gap-2 p-3">
              {data?.data?.avatar_url === null ? (
                <img
                  className="w-[60px] h-[60px]"
                  src={ShoppingBagSVG}
                  alt="Shopping bag"
                />
              ) : (
                <img
                  className="w-[60px] h-[60px]"
                  src={data?.data?.avatar_url}
                  alt="Shopping bag"
                />
              )}

              <div className="flex flex-col">
                <h5 className="text-xl font-light">Order count</h5>
                <p className="text-3xl">22</p>
              </div>
            </div>
            <div className="bg-milky-white rounded-[15px] flex flex-row gap-2 p-3">
              <img
                className="w-[60px] h-[60px]"
                src={ShoppingBagSVG}
                alt="Shopping bag"
              />
              <div className="flex flex-col">
                <h5 className="text-xl font-light">Favorites</h5>
                <p className="text-3xl">21</p>
              </div>
            </div>
            <div className="bg-milky-white rounded-[15px] flex flex-row gap-2 p-3">
              <img
                className="w-[60px] h-[60px]"
                src={ShoppingBagSVG}
                alt="Shopping bag"
              />
              <div className="flex flex-col">
                <h5 className="text-xl font-light">Kafy points</h5>
                <p className="text-3xl">50</p>
              </div>
            </div>
            <div className="bg-milky-white rounded-[15px] flex flex-row gap-2 p-3">
              <img
                className="w-[60px] h-[60px]"
                src={ShoppingBagSVG}
                alt="Shopping bag"
              />
              <div className="flex flex-col">
                <h5 className="text-xl font-light">Top pick</h5>
                <p className="text-3xl underline decoration-burnt-sienna">
                  Espresso
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-start">
            <Button variant={"main"}>Edit profile</Button>
          </div>
        </div>
        {/** More simple Analytics */}
        <AnalyticsBentoGrid />
      </section>
      <section className="h-full">
        {/* <OrderHistory /> */}
        {latestOrderIsLoading ? (
          <Loading />
        ) : latestOrder?.data && latestOrder.data.length > 0 ? (
          <OrderCard order={latestOrder.data[0]} />
        ) : (
          <div className="bg-milky-white rounded-[30px] shadow-xl h-[300px] flex flex-col gap-2 items-center justify-center">
            <p>No recent order</p>
            <Button asChild variant="secondary">
              <Link to={"/menu"}>Order Now</Link>
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}

function AnalyticsBentoGrid() {
  return (
    <div className="bg-milky-white rounded-[30px] shadow-xl col-span-2 row-span-2 grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-2 grid-flow-dense gap-2 p-5">
      <div className="bg-cappuccino/80 rounded-[15px] col-span-1 flex flex-col justify-center items-center">
        <Logo classname="" />
        {/* <img src={KafyLogo} className="h-[100px] w-[100px]" /> */}
      </div>
      <div className="bg-black-coffee/85 rounded-[15px] col-span-3 flex flex-row justify-center items-center gap-4 p-3 lg:p-0">
        <p className="text-milky-white font-light text-3xl">
          Average rating given
        </p>
        <div className="h-[150px] w-[150px] rounded-full border-3 flex flex-col justify-center items-center">
          <span className="text-5xl font-bold text-milky-white">4.4</span>
          <img src={StarSVG} alt="Star svg" className="h-[50px] w-[50px]" />
        </div>
      </div>

      <div className="bg-light-caramel rounded-[15px] col-span-3 lg:col-span-2 row-span-1 flex flex-col justify-center items-center p-5 gap-2">
        <p className="text-3xl text-raisin-black text-center">
          Average items per order
        </p>
        <span className="text-4xl font-bold text-raisin-black">2.3 items</span>
      </div>
      <div className="bg-golden-brown/70 rounded-[15px] col-span-3 flex flex-col justify-center items-center text-center gap-5 p-3 lg:p-0">
        <span className="text-3xl text-milky-white font-bold">
          Check out what's brewing!
        </span>
        <Button
          variant="outline2"
          className="text-light-caramel border-light-caramel hover:bg-light-caramel hover:text-raisin-black"
        >
          Check out
        </Button>
      </div>
      <div className="bg-royal-brown/90 rounded-[15px] col-span-3 text-milky-white flex flex-row justify-items-start items-center gap-2 p-2">
        <CalendarCheck2Icon className="stroke-1 text-milky-white w-[150px] h-[150px]" />
        <div className="w-full">
          <h5 className="font-light text-3xl">Last order</h5>
          <p className="text-4xl font-bold">June 15, 2025</p>
        </div>
      </div>
    </div>
  );
}
