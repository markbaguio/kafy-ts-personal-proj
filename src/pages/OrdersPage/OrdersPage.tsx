import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { OrderStatus } from "@/models/types";
import OrderCard from "@/components/common/OrderCard";
import { createGetOrdersQueryOptions } from "@/queryOptions/createGetOrdersQueryOptions";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

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
