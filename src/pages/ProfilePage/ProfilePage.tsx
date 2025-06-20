import { createGetProfileQueryOptions } from "@/queryOptions/createGetProfileQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { data } = useQuery(createGetProfileQueryOptions());

  return (
    <section className="w-screen bg-off-white-2/50 grid grid-cols-1 lg:grid-flow-col lg:grid-cols-3 p-10 gap-15 min-h-[850px] max-h-lvh overflow-y-auto">
      {/** Profile grid */}
      <div className="overflow-hidden bg-milky-white rounded-[30px] shadow-xl row-span-2 col-span-2 lg:col-span-1 flex flex-col gap-20">
        <div className="bg-success-green flex flex-col items-center gap-10 py-10">
          <div className="overflow-hidden w-[100px] h-[100px] bg-black-coffee rounded-full">
            {/** img */}
            <User className="w-[100px] h-[100px]" />
          </div>
          <div className="flex flex-col text-center">
            <h1 className="text-3xl font-bold">
              {data?.data?.first_name} {""}
              {data?.data?.last_name}
            </h1>
            <h6 className="text-md font-light">{data?.data?.email}</h6>
            <h6 className="text-sm font-extralight">
              Joined at {data?.data?.created_at.toLocaleDateString()}
            </h6>
          </div>
        </div>
        <div className="bg-burnt-sienna w-full">basic analytics</div>
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
