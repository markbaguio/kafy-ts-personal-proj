import { AxiosErrorCode } from "@/constants";
import {
  isApiErrorResponse,
  isAuthSessinoMissingErrorResponse,
} from "@/lib/utils";
import { getRefreshProfile } from "@/services/authServiceApi";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

export function useAuth() {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getRefreshProfile,
    retry: (failureCount, error) => {
      if (isAuthSessinoMissingErrorResponse(error)) return false;

      if (
        isApiErrorResponse(error) &&
        error.errorName === AxiosErrorCode.NetworkError
      ) {
        toast.warning(error.message);
        return false;
      }

      if (failureCount >= 1) {
        return false;
      }

      return true;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log("query.data change, executing...");

    if (query.data?.data) {
      useAuthStore.setState({ profile: query.data?.data });
      useAuthStore.setState({ isSignedIn: !!query.data?.data });
    }
  }, [query.data]);
}
