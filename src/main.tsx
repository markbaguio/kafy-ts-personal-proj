import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Homepage from "./pages/Homepage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import { Menu } from "./pages/Menu.tsx";
import Rewards from "./pages/Rewards.tsx";
import GiftCards from "./pages/GiftCards.tsx";
import { SignIn } from "./pages/SignIn.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/menu", element: <Menu /> },
      { path: "/rewards", element: <Rewards /> },
      {
        path: "/gift",
        element: <GiftCards />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "signin", element: <SignIn /> }],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
