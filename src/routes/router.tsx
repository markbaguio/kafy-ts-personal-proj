import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import GiftCards from "@/pages/GiftCards";
import Homepage from "@/pages/Homepage";
import { Menu } from "@/pages/Menu";
import NotFoundPage from "@/pages/NotFoundPage";
import Rewards from "@/pages/Rewards";
import { SignIn } from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
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
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);

export default router;
