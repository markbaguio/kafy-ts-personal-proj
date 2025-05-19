import { render, screen } from "@testing-library/react";
import { mockServer } from "@/mocks/server/server";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";
import { AUTH_SIGN_IN, BASE_URL } from "@/constants";
import { renderWithProviders } from "@/lib/test-utils";
import { SignInPage } from "./SignInPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";
import Homepage from "@/pages/Homepage";
import { UserSignInRequestBody } from "@/mocks/handlers/handlers";
import { ApiErrorResponse } from "@/models/ApiResponse";

const user = userEvent.setup();
const queryClient = new QueryClient();

describe("SignInPage", () => {
  describe("Success flow", () => {
    //? Homepage is not being rendered that's why the .findbytext isn't working. - Fixed
    /**
     * ? This is because the SignInPage component is not actually navigating to the Homepage component after a successful sign-in.
     * ? Because the <Homepage /> component is not being rendered in the test.
     * ? -----------------------------------------------------------------------------
     */
    it("signs in successfully and redirects to homepage", async () => {
      // renderWithProviders(<SignInPage />, {}, `${AUTH_SIGN_IN}`);

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/auth/signin"]}>
            <Routes>
              <Route path={`${AUTH_SIGN_IN}`} element={<SignInPage />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      );

      await user.type(screen.getByLabelText(/Email/i), "usertest@gmail.com");

      await user.type(screen.getByLabelText(/Password/i), "123456789Test");

      await user.click(screen.getByTestId("login-button"));

      //? check if the user is redirected to the homepage after a successful sign in.
      const heading = await screen.findByText(/More to sip and savor/i);
      expect(heading).toBeInTheDocument();
      // screen.debug();
    });
  });

  // ? ------------------------------------------------------------------------------------

  describe("Failure flow", () => {
    it("renders AuthErrorFallback when unexpected error occurs during sign-in", async () => {
      //? override handler using .use to simulate an unexpected error
      mockServer.use(
        http.post<{}, UserSignInRequestBody, ApiErrorResponse>(
          `${BASE_URL}${AUTH_SIGN_IN}`,
          () => {
            return HttpResponse.json({
              statusCode: 500,
              errorName: "InternalServerError",
              message: "An unexpected error occurred",
              errorDetails: "Something went wrong",
              name: "Error",
            });
          }
        )
      );

      // render the component
      renderWithProviders(<SignInPage />, {}, "/auth/signin");

      // fill up the input fields with mock credentials
      await user.type(screen.getByLabelText(/email/i), "test@example.com");
      await user.type(screen.getByLabelText(/password/i), "12345678Password");

      // click the login button
      await user.click(screen.getByTestId("login-button"));

      //? check for the rendered component/jsx
      // screen.debug();

      expect(
        await screen.findByText(/Whoops! Something went wrong/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Retry/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Home/i })).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("shows a toast when network error occurs", async () => {
      //? override handler using .use to simulate a network error
      mockServer.use(
        http.post(`${BASE_URL}${AUTH_SIGN_IN}`, () => {
          return HttpResponse.error();
        })
      );

      // render the component
      renderWithProviders(<SignInPage />, {}, "/auth/signin");

      // fill up the input fields with mock credentials
      await user.type(screen.getByLabelText(/email/i), "test@example.com");
      await user.type(screen.getByLabelText(/password/i), "12345678Password");

      // click the login button
      await user.click(screen.getByTestId("login-button"));

      expect(
        await screen.findByText(
          /Unable to reach server. Please check your internet connection./i
        )
      ).toBeInTheDocument();
    });
  });
});
