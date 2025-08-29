import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  OrderStatus,
  OrdersWithOrderItemsWithImageAndCategory,
} from "@/models/types";
import OrderCard from "@/components/common/OrderCard";
import { createGetOrdersQueryOptions } from "@/queryOptions/createGetOrdersQueryOptions";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const mockOrdersData: OrdersWithOrderItemsWithImageAndCategory = [
  {
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
  },
  {
    id: 37,
    total_amount: 555,
    status: "orderPlaced",
    created_at: "2025-08-18T08:10:38.628674+00:00",
    profile_id: "f6f2bde4-8276-4e86-8d90-7138ee7fd516",
    order_items: [
      {
        id: 29,
        created_at: "2025-08-18T08:10:38.719108+00:00",
        product_id: 17,
        product_name: "Frapino Mocha",
        price_at_purchase: 190,
        order_id: 37,
        quantity: 2,
        product_size: "M",
        image_url:
          "https://images.unsplash.com/photo-1530373239216-42518e6b4063?auto=format&fit=crop&q=60&w=800",
        category: "cold",
      },
      {
        id: 30,
        created_at: "2025-08-18T08:10:38.719108+00:00",
        product_id: 14,
        product_name: "Iced Latte",
        price_at_purchase: 160,
        order_id: 37,
        quantity: 1,
        product_size: "M",
        image_url:
          "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=60&w=800",
        category: "cold",
      },
    ],
  },
];

//TODOS:
//TODO2: Implement the latest order in the profile page. Users will be able to access their order history from the profile page.
//TODO2.1: add empty string literal on status since "" will serve as the "all" status which will query all orders.

export default function OrdersPage() {
  //? Maybe use the throwOnError option to throw an error if the query fails so that the errorElement will handle it.
  //? but since this we're fetching in the component maybe we should just use the isError state and handle the error here.
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("orderPlaced");

  const { data, isLoading, isError, isFetching, refetch } = useQuery(
    createGetOrdersQueryOptions(
      { status: orderStatus },
      { retry: 1, refetchOnWindowFocus: false }
    )
  );

  function handleStatusChange(status: OrderStatus) {
    setOrderStatus(status);
    //? Optionally, you can refetch the orders with the new status
    // queryClient.invalidateQueries({
    //   queryKey: createGetOrdersQueryOptions({ status }).queryKey,
    // });
  }

  return (
    <main className=" w-full h-full px-50 py-10 flex flex-col gap-3 bg-off-white-2/50">
      <section className="text-4xl font-bold">Order History</section>
      <section>
        <Tabs
          defaultValue="orderPlaced"
          onValueChange={(newValue) =>
            handleStatusChange(newValue as OrderStatus)
          }
          className="w-full"
        >
          <TabsList className="w-full h-full border ">
            <TabsTrigger
              className="text-xl py-5 hover:cursor-pointer hover:bg-raisin-black/20 transition-colors duration-300 data-[state=active]:bg-raisin-black data-[state=active]:text-milky-white"
              value="orderPlaced"
            >
              Placed Orders
            </TabsTrigger>
            <TabsTrigger
              className="text-xl py-5 hover:cursor-pointer hover:bg-raisin-black/20 transition-colors duration-300 data-[state=active]:bg-raisin-black data-[state=active]:text-milky-white"
              value="completed"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              className="text-xl py-5 hover:cursor-pointer hover:bg-raisin-black/20 transition-colors duration-300 data-[state=active]:bg-raisin-black data-[state=active]:text-milky-white"
              value="canceled"
            >
              Canceled
            </TabsTrigger>
          </TabsList>
          <TabsContent className="flex flex-col gap-5" value={orderStatus}>
            {isLoading || isFetching ? (
              <Loading />
            ) : isError ? (
              <div className="text-center text-raisin-black-muted flex flex-col justify-center items-center w-full h-lvh gap-2">
                Failed to load orders. Please check your connection.
                <Button className="w-fit" onClick={() => refetch()}>
                  Retry
                </Button>
              </div>
            ) : data?.data?.length === 0 ? (
              <div className="text-center text-raisin-black-muted flex flex-col justify-center items-center w-full h-lvh gap-2">
                <span>No orders found</span>
                <Button asChild variant="main">
                  <Link to="/menu">Order now</Link>
                </Button>
              </div>
            ) : (
              data?.data?.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            )}
            {/* {mockOrdersData.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))} */}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
