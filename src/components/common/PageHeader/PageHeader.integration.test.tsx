import { AUTH_SIGN_IN, AUTH_SIGN_OUT, BASE_URL } from "@/constants";
import { mockSignInData } from "@/mocks/mockData/mockData";
import { mockServer } from "@/mocks/server/server";
import { ApiResponse } from "@/models/ApiResponse";
import { routes } from "@/routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { createMemoryRouter, RouterProvider } from "react-router";

const queryClient: QueryClient = new QueryClient();
const user = userEvent.setup();

type SignOutResponseType = ApiResponse<null>;

describe("PageHeader", () => {
  describe("PageHeader rendering", () => {
    it("Renders basic Page header without the sign out and profile button for unauthenticated user/not signed in user.", () => {
      const router = createMemoryRouter(routes, {
        initialEntries: ["/"],
      });

      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );

      expect(screen.getByTestId("page-header")).toBeInTheDocument();
      expect(screen.getByTestId("nav")).toBeInTheDocument();
      expect(screen.getByTestId("HOME-nav-button")).toBeInTheDocument();
      expect(screen.getByTestId("MENU-nav-button")).toBeInTheDocument();
      expect(screen.getByTestId("REWARDS-nav-button")).toBeInTheDocument();
      expect(screen.getByTestId(/GIFT CARDS-nav-button/i)).toBeInTheDocument();
      expect(
        screen.getByTestId("page-header-signin-button")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("page-header-signup-button")
      ).toBeInTheDocument();
      expect(screen.getByTestId("store-locator-button")).toBeInTheDocument();

      expect(screen.queryByTestId("signout-button")).not.toBeInTheDocument();
      expect(screen.queryByTestId("profile-button")).not.toBeInTheDocument();
    });

    it("renders page header with profile and sign out button for authenticated/signed in user.", async () => {
      const router = createMemoryRouter(routes, {
        // initialEntries: ["/auth/signin"],
        initialEntries: [`${AUTH_SIGN_IN}`],
      });

      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );

      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

      await user.type(
        screen.getByPlaceholderText("Email"),
        mockSignInData.email
      );
      await user.type(
        screen.getByPlaceholderText("Password"),
        mockSignInData.password
      );

      await user.click(screen.getByTestId("login-button"));

      expect(await screen.findByTestId("page-header")).toBeInTheDocument();
      expect(await screen.findByTestId("signout-button")).toBeInTheDocument();
      // TODO: continue this test case.
    });
  });

  describe.only("PageHeader navigation", () => {
    // it("navigates to profile page when profile button is clicked", async () => {
    //   const router = createMemoryRouter(routes, {
    //     initialEntries: ["/auth/signin"],
    //   });

    //   render(
    //     <QueryClientProvider client={queryClient}>
    //       <RouterProvider router={router} />
    //     </QueryClientProvider>
    //   );

    //   //? SIGN IN
    //   expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    //   expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    //   await user.type(
    //     screen.getByPlaceholderText("Email"),
    //     mockSignInData.email
    //   );
    //   await user.type(
    //     screen.getByPlaceholderText("Password"),
    //     mockSignInData.password
    //   );

    //   await user.click(screen.getByTestId("login-button"));

    //   expect(await screen.findByTestId("profile-button")).toBeInTheDocument();

    //   await user.click(screen.getByTestId("profile-button"));

    //   expect(router.state.location.pathname).toBe("/profile");
    // });
    it("sign out the user when the sign out button is clicked", async () => {
      mockServer.use(
        http.post<{}, {}, SignOutResponseType>(
          `${BASE_URL}${AUTH_SIGN_OUT}`,
          () => {
            return HttpResponse.json({
              statusCode: 200,
              message: "User signed out successfully",
              data: null,
            });
          }
        )
      );

      const router = createMemoryRouter(routes, {
        initialEntries: ["/auth/signin"],
      });

      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );

      //? SIGN IN
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

      await user.type(
        screen.getByPlaceholderText("Email"),
        mockSignInData.email
      );
      await user.type(
        screen.getByPlaceholderText("Password"),
        mockSignInData.password
      );

      await user.click(screen.getByTestId("login-button"));

      expect(await screen.findByTestId("signout-button")).toBeInTheDocument();

      await user.click(screen.getByTestId("signout-button"));

      expect(router.state.location.pathname).toBe("/auth/signin");
    });
  });
});
