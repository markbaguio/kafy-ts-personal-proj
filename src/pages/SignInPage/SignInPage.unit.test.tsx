import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignInPage } from "./SignInPage";
import { renderWithProviders } from "@/lib/test-utils";
import { UserSignInSchema } from "@/schemas/auth/UserSignInFormSchema";
import * as authServiceApi from "@/services/authServiceApi";
import { SignInPayload } from "@/services/authServiceApi";
import { ApiResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/types";
import { successfulSignInProfileData } from "@/mocks/mockData/mockData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { routes } from "@/routes/routes";

vi.mock("@/services/authServiceApi", () => ({
  signInUser: vi.fn(),
}));

const user = userEvent.setup();
const queryClient = new QueryClient();

const mockPayload: SignInPayload = {
  email: "test@example.com",
  password: "securePassword123",
};

describe("SignInPage unit tests", () => {
  describe("SignInPage rendering", () => {
    it("renders the Auth header, SignInPage, and Footer ", () => {
      // renderWithProviders(<SignInPage />, {}, "/auth/signin");

      const router = createMemoryRouter(routes, {
        initialEntries: ["/auth/signin"],
      });

      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );

      //? AUTH HEADER
      expect(screen.getByTestId("auth-header")).toBeInTheDocument();
      expect(screen.getAllByText(/KAFY/i)[0]).toBeInTheDocument();

      // ? MAIN CONTENT
      expect(
        screen.getByRole("heading", { name: /Login to your account/i })
      ).toBeInTheDocument();
      expect(
        screen.getAllByText(
          /Sign up now and start earning Kafy Coins with every purchase!/i
        )
      );

      //? FOOTER
      expect(screen.getByTestId("footer")).toBeInTheDocument();
      expect(
        screen.getByText("Fueled by ☕ & passion. Thanks for stopping by!")
      ).toBeInTheDocument();
      expect(screen.getByText("MENU")).toBeInTheDocument();
      expect(screen.getByText("REWARDS")).toBeInTheDocument();
      expect(screen.getByText("GIFT CARDS")).toBeInTheDocument();
      expect(screen.getByText("ABOUT US")).toBeInTheDocument();
    });
  });

  describe("SignInPage form validation", () => {
    it("shows required field errors when empty", async () => {
      renderWithProviders(<SignInPage />, {}, "/auth/signin");
      const loginButton: HTMLButtonElement = screen.getByTestId("login-button");
      await user.click(loginButton);
      expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
      expect(
        await screen.findByText(/Password is required/i)
      ).toBeInTheDocument();
    });

    it("shows field errors when inputs are invalid", async () => {
      const result = UserSignInSchema.safeParse({
        email: "invalid-email",
        password: "",
      });
      expect(result.success).toBe(false);
    });
  });
  describe("Sign in user submit logic", () => {
    it("submits form and calls signInUser with user input", async () => {
      const mockResponse: ApiResponse<Profile> = {
        statusCode: 200,
        data: successfulSignInProfileData.data,
      };

      const mockedSignInUser = vi.mocked(authServiceApi.signInUser);
      mockedSignInUser.mockResolvedValueOnce(mockResponse);

      renderWithProviders(<SignInPage />, {}, "/auth/signin");

      await user.type(screen.getByLabelText(/Email/i), mockPayload.email);
      await user.type(screen.getByLabelText(/Password/i), mockPayload.password);

      await user.click(screen.getByTestId("login-button"));

      expect(mockedSignInUser).toHaveBeenCalledTimes(1);
      expect(mockedSignInUser).toHaveBeenCalledWith(mockPayload);
    });

    it("shows a Loading state spinner when the form is submitting", async () => {
      const mockResponse: ApiResponse<Profile> = {
        statusCode: 200,
        data: successfulSignInProfileData.data,
      };
      const mockedSignInUser = vi.mocked(authServiceApi.signInUser);
      mockedSignInUser.mockImplementation(
        () =>
          new Promise((resolve) => setTimeout(() => resolve(mockResponse), 100))
      );

      renderWithProviders(<SignInPage />, {}, "/auth/signin");

      await user.type(screen.getByLabelText(/Email/i), mockPayload.email);
      await user.type(screen.getByLabelText(/Password/i), mockPayload.password);
      await user.click(screen.getByTestId("login-button"));

      expect(await screen.findByTestId("sign-in-loading")).toBeInTheDocument();
    });
  });
});
