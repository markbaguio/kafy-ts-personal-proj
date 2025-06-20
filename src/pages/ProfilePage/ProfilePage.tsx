import { createGetProfileQueryOptions } from "@/queryOptions/createGetProfileQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import ShoppingBagSVG from "@/assets/ProfilePage/shopping-bag-svgrepo-com.svg";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { data } = useQuery(createGetProfileQueryOptions());

  return (
    <section className="w-screen bg-off-white-2/50 grid grid-cols-1 lg:grid-flow-col lg:grid-cols-3 p-10 gap-15 min-h-[850px] max-h-lvh overflow-y-auto">
      {/** Profile grid */}
      <div className="overflow-hidden bg-milky-white rounded-[30px] shadow-xl row-span-2 col-span-2 lg:col-span-1 flex flex-col gap-10 items-center p-5">
        <div className="flex flex-col items-center gap-10 p-15 w-full">
          <div className="overflow-hidden  bg-royal-brown/50 rounded-full">
            <User className="w-[200px] h-[200px]" />
          </div>
          <div className="flex flex-col text-center">
            <h1 className="text-4xl font-bold">
              {data?.data?.first_name} {""}
              {data?.data?.last_name}
            </h1>
            <h6 className="text-md font-light">{data?.data?.email}</h6>
            <h6 className="text-sm font-extralight">
              Joined at {data?.data?.created_at.toLocaleDateString()}
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
      <div className="bg-milky-white rounded-[30px] shadow-xl col-span-2">
        Analytics
      </div>
      <div className="bg-milky-white rounded-[30px] shadow-xl col-span-2">
        Order history
      </div>
    </section>
  );
}
