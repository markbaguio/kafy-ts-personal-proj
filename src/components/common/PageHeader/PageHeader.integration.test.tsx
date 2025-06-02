import { routes } from "@/routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";

const queryClient: QueryClient = new QueryClient();
const user = userEvent.setup();

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
  });
});
