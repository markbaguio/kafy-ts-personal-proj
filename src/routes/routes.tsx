import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";
import AboutUs from "@/pages/AboutUs";
import GiftCards from "@/pages/GiftCards";
import Homepage from "@/pages/Homepage";
import MenuPage from "@/pages/MenuPage/MenuPage";
import ErrorBoundary from "@/pages/ErrorBoundary";
import Rewards from "@/pages/Rewards";
import { SignInPage } from "@/pages/SignInPage/SignInPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import { RouteObject } from "react-router";
import MenuProductDetailPage from "@/pages/MenuProductDetailPage/MenuProductDetailPage";
import PageUnderConstruction from "@/pages/PageUnderConstruction";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import CartPage from "@/pages/CartPage/CartPage";
import CheckoutPage from "@/pages/CheckoutPage/CheckoutPage";
import ProtectedRoute from "@/components/common/ProtectedRoute/ProtectedRoute";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/menu", element: <MenuPage /> },
      { path: "/menu/:product_id", element: <MenuProductDetailPage /> },
      { path: "/rewards", element: <Rewards /> },
      {
        path: "/gift",
        element: <GiftCards />,
      },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/menu/favorites", element: <PageUnderConstruction /> },
      { path: "/cart", element: <CartPage /> },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
];
