import { createBrowserRouter } from "react-router";
import { routes } from "./routes";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     errorElement: <NotFoundPage />,
//     children: [
//       { index: true, element: <Homepage /> },
//       { path: "/menu", element: <Menu /> },
//       { path: "/rewards", element: <Rewards /> },
//       {
//         path: "/gift",
//         element: <GiftCards />,
//       },
//       { path: "/about-us", element: <AboutUs /> },
//     ],
//   },
//   {
//     path: "/auth",
//     element: <AuthLayout />,
//     errorElement: <NotFoundPage />,
//     children: [
//       { path: "signin", element: <SignInPage /> },
//       { path: "signup", element: <SignUpPage /> },
//     ],
//   },
// ]);
const router = createBrowserRouter(routes);

export default router;
