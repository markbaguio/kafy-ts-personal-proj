import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import AboutUs from "@/pages/AboutUs";
import GiftCards from "@/pages/GiftCards";
import Homepage from "@/pages/Homepage";
import { Menu } from "@/pages/Menu";
import NotFoundPage from "@/pages/NotFoundPage";
import Rewards from "@/pages/Rewards";
import { SignInPagge } from "@/pages/SinInPage/SignInPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import { createBrowserRouter } from "react-router";

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
      { path: "/about-us", element: <AboutUs /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "signin", element: <SignInPagge /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

export default router;
