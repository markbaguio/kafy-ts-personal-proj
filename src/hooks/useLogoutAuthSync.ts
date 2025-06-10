import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useLogoutAuthAsync() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutBroadcastChannel = new BroadcastChannel("auth");

    logoutBroadcastChannel.onmessage = (event) => {
      if (event.data === "logout") {
        // console.log(
        //   "Received logout message from another tab via broadcast channel."
        // );
        useAuthStore.getState().signOut();
        navigate("/auth/signin");
      }
    };

    return () => {
      logoutBroadcastChannel.close();
    };
  }, []);
}
