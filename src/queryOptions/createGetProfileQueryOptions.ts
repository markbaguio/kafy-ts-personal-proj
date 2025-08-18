import { getProfile } from "@/services/profileService";
import { queryOptions } from "@tanstack/react-query";

export function createGetProfileQueryOptions() {
  return queryOptions({
    queryKey: ["profile"],
    // queryFn: async ({ signal }) => {
    //   const response = await fetch("/api/profile", { signal });
    //   if (!response.ok) {
    //     throw new Error("Failed to fetch profile");
    //   }
    //   return response.json();
    // },
    queryFn: getProfile,
    // select: (data) => data, // Assuming the data is already in the desired format
    retry: 2,
    refetchOnWindowFocus: true,
    // staleTime: 1000 * 60 * 5, // 5 minutess
  });
}
