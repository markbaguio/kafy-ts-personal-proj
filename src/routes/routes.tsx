import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import AboutUs from "@/pages/AboutUs";
import GiftCards from "@/pages/GiftCards";
import Homepage from "@/pages/Homepage";
import MenuPage from "@/pages/MenuPage/MenuPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import Rewards from "@/pages/Rewards";
import { SignInPage } from "@/pages/SignInPage/SignInPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import { RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/api/menu", element: <MenuPage /> },
      { path: "/rewards", element: <Rewards /> },
      {
        path: "/gift",
        element: <GiftCards />,
      },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/profile", element: <ProfilePage /> },
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
