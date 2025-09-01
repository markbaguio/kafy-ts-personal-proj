import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";
import { ConfigProvider } from "react-avatar";

export const queryClient = new QueryClient();

/**
 * ! TECHNICAL DEBT:
 * ! 1. Implement axios interceptor to handle access token refresh if the access token expires during an operation.
 * ! 2. Move the useAuth hook to protected routes only and to components that rely on useAuthStore such as the header since it uses the useCartStore which is hydrated by the useAuth to render correct UI.
 */

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <AuthProvider> */}
    <Toaster />
    <ConfigProvider colors={["#9d581f", "#53322f", "#3a2f2f", "#a18d68"]}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
    {/* </AuthProvider> */}
  </StrictMode>
);
