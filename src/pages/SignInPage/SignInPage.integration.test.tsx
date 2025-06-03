import { render, screen } from "@testing-library/react";
import { mockServer } from "@/mocks/server/server";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";
import { AUTH_SIGN_IN, BASE_URL } from "@/constants";
import { renderWithProviders } from "@/lib/test-utils";
import { SignInPage } from "./SignInPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { UserSignInRequestBody } from "@/mocks/handlers/handlers";
import { ApiErrorResponse } from "@/models/ApiResponse";
import { routes } from "@/routes/routes";
import { mockSignInData } from "@/mocks/mockData/mockData";

const user = userEvent.setup();
const queryClient = new QueryClient();

// const mockSignInData = {
//   email: "usertest@gmail.com",
//   password: "123456789Test",
//   invalidEmail: "invalid-email",
//   invalidPassword: "invalid-password",
// };

describe("SignInPage", () => {
  describe("Success flow", () => {
    //? Homepage is not being rendered that's why the .findbytext isn't working. - Fixed
    /**
     * ? This is because the SignInPage component is not actually navigating to the Homepage component after a successful sign-in.
     * ? Because the <Homepage /> component is not being rendered in the test.
     * ? -----------------------------------------------------------------------------
     */
    it("redirects to the homepage and shows Header UI after successful sign-in", async () => {
      const router = createMemoryRouter(routes, {
        initialEntries: ["/auth/signin"],
      });

      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );

      await user.type(screen.getByLabelText(/Email/i), mockSignInData.email);
      await user.type(
        screen.getByLabelText(/Password/i),
        mockSignInData.password
      );
      await user.click(screen.getByTestId("login-button"));

      //? main content heading
      const heading = await screen.findByText(
        /More to sip and savor/i,
        {},
        { timeout: 2000 } //? this timeout is needed to wait for the [mockFetchSectionsData]  to fetch the data due to the mock delay of 1000ms using setTimeout.
      );

      //? header UI
      const signOutButton = await screen.findByRole("button", {
        name: /Sign out/i,
      });
      const profileButton = await screen.findByTestId("profile-button");

      //? footer
      const footerText = await screen.findByText(
        "Fueled by ☕ & passion. Thanks for stopping by!"
      );

      expect(heading).toBeInTheDocument();
      expect(signOutButton).toBeInTheDocument();
      expect(profileButton).toBeInTheDocument();
      expect(footerText).toBeInTheDocument();
      expect(router.state.location.pathname).toBe("/");
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
      await user.type(screen.getByLabelText(/email/i), mockSignInData.email);
      await user.type(
        screen.getByLabelText(/password/i),
        mockSignInData.password
      );

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

    //? CLIENT SIDE VALIDATION
    it("shows validation error when email is invalid", async () => {
      renderWithProviders(<SignInPage />, {}, "/auth/signin");

      // fill up the input fields with mock credentials
      await user.type(
        screen.getByLabelText(/email/i),
        mockSignInData.invalidEmail
      );
      await user.type(
        screen.getByLabelText(/password/i),
        mockSignInData.password
      );

      // click the login button
      await user.click(screen.getByTestId("login-button"));

      expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
    });

    it("shows validation error when password is empty.", async () => {
      renderWithProviders(<SignInPage />, {}, "/auth/signin");
      // fill up the input fields with mock credentials
      await user.type(screen.getByLabelText(/email/i), mockSignInData.email);

      // click the login button
      await user.click(screen.getByTestId("login-button"));

      expect(
        await screen.findByText(/Password is required/i)
      ).toBeInTheDocument();
    });

    //? BACKEND VALIDATION
    it("shows an error message when email or password is incorrect", async () => {
      mockServer.use(
        http.post<{}, UserSignInRequestBody, ApiErrorResponse>(
          `${BASE_URL}${AUTH_SIGN_IN}`,
          async ({ request }) => {
            const body = await request.json();
            const { email, password } = body;
            // check if the credentials are correct. (MOCK)
            if (
              email !== mockSignInData.email ||
              password !== mockSignInData.password
            ) {
              return HttpResponse.json(
                {
                  statusCode: 400,
                  errorName: "AuthApiError",
                  message: "Invalid login credentials",
                  errorDetails: {
                    code: "invalid_credentials",
                    name: "AuthApiError",
                    status: 400,
                  },
                  name: "AuthApiError",
                },
                { status: 400 }
              );
            }
            // Optionally, return a successful response if needed
            // return HttpResponse.json(successfulSignInProfileData); // or whatever your success response is
          }
        )
      );
      // mockServer.use(
      //   http.post<{}, UserSignInRequestBody, ApiErrorResponse>(
      //     `${BASE_URL}${AUTH_SIGN_IN}`,
      //     () => {
      //       return HttpResponse.json(
      //         {
      //           statusCode: 400,
      //           errorName: "AuthApiError",
      //           message: "Invalid login credentials",
      //           errorDetails: {
      //             code: "invalid_credentials",
      //             name: "AuthApiError",
      //             status: 400,
      //           },
      //           name: "AuthApiError",
      //         },
      //         { status: 455 }
      //       );
      //     }
      //   )
      // );

      renderWithProviders(<SignInPage />, {}, "/auth/signin");

      await user.type(screen.getByLabelText(/email/i), mockSignInData.email);
      await user.type(
        screen.getByLabelText(/password/i),
        mockSignInData.invalidPassword
      );
      await user.click(screen.getByTestId("login-button"));

      expect(
        await screen.findByText(/Invalid login credentials/i)
      ).toBeInTheDocument();
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
      await user.type(screen.getByLabelText(/email/i), mockSignInData.email);
      await user.type(
        screen.getByLabelText(/password/i),
        mockSignInData.password
      );

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
