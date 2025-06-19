import { createGetProfileQueryOptions } from "@/queryOptions/createGetProfileQueryOptions";
import { useQuery } from "@tanstack/react-query";

export default function ProfilePage() {
  const { data } = useQuery(createGetProfileQueryOptions());

  return (
    <main className="w-screen bg-off-white-2/50 grid grid-cols-1 lg:grid-flow-col lg:grid-cols-3 p-10 gap-15 min-h-[850px] max-h-lvh overflow-y-auto">
      {/** Profile grid */}
      <div className="bg-milky-white rounded-[30px] shadow-lg row-span-2 col-span-2 lg:col-span-1 ">
        <div className="flex flex-col items-center gap-10">
          <div className="w-[100px] h-[100px] bg-black-coffee rounded-full">
            {/** img */}
          </div>
          <div className="flex flex-col text-center gap-1">
            <h1 className="text-3xl">
              {data?.data?.first_name} {""}
              {data?.data?.last_name}
            </h1>
            <h6 className="text-md font-light">{data?.data?.email}</h6>
            <h6 className="text-sm font-extralight">
              Joined at {data?.data?.created_at.toLocaleDateString()}
            </h6>
          </div>
        </div>
      </div>
      <div className="bg-milky-white rounded-[30px] shadow-lg col-span-2">
        Analytics
      </div>
      <div className="bg-milky-white rounded-[30px] shadow-lg col-span-2">
        Order history
      </div>
    </main>
  );
}
