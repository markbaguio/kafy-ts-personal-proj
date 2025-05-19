import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import AboutUs from "@/pages/AboutUs";
import GiftCards from "@/pages/GiftCards";
import Homepage from "@/pages/Homepage";
import NotFoundPage from "@/pages/NotFoundPage";
import Rewards from "@/pages/Rewards";
import { SignInPage } from "@/pages/SignInPage/SignInPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import { Menu } from "lucide-react";
import { RouteObject } from "react-router";

export const routes: RouteObject[] = [
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
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
];
