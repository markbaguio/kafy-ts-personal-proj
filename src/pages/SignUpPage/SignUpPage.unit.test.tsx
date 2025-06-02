import { renderWithProviders } from "@/lib/test-utils";
import { routes } from "@/routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import SignUpPage from "./SignUpPage";

const user: UserEvent = userEvent.setup();
const queryClient: QueryClient = new QueryClient();

// async function typePassword(value: string = "") {
//   const passwordInput = screen.getByPlaceholderText("Password");

//   await user.type(passwordInput, value);

//   return passwordInput;
// }

type mockPasswordType = {
  shortPassword: string;
  missingUpperCaseLetter: string;
  missingLowerCaseLetter: string;
  passwordMismatch: string;
  confirmPasswordMismatch: string;
};

const mockPassword: mockPasswordType = {
  shortPassword: "short",
  missingUpperCaseLetter: "12345678m",
  missingLowerCaseLetter: "12345678M",
  passwordMismatch: "passwordMismatch",
  confirmPasswordMismatch: "confirmPasswordMismatch",
};

describe("SignUpPage unit tests", () => {
  describe("SignUpPage rendering", () => {
    it("renders the Auth header, SignUpPage, and Footer", () => {
      const router = createMemoryRouter(routes, {
        initialEntries: ["/auth/signup"],
      });

      render(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );

      screen.debug(undefined, 20000);

      //? AUTH HEADER
      expect(screen.getByTestId("auth-header")).toBeInTheDocument();
      expect(screen.getAllByText(/KAFY/i)[0]).toBeInTheDocument();

      //? MAIN CONTENT
      expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
      expect(screen.getByText(/Kafy Rewards/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /Sign up now and start earning Kafy Coins with every purchase!/i
        )
      ).toBeInTheDocument();

      expect(screen.getByText(/Personal Information/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/First name/i)).toBeInTheDocument();
      expect(screen.getByTestId("first-name-input")).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Last name/i)).toBeInTheDocument();
      expect(screen.getByTestId("last-name-input")).toBeInTheDocument();

      expect(screen.getByText(/Account Security/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
      expect(screen.getByTestId("email-input")).toBeInTheDocument();

      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(screen.getByTestId("password-input")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/Confirm Password/i)
      ).toBeInTheDocument();
      expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();

      expect(screen.getByTestId("signup-button")).toBeInTheDocument();

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

  //? FRONTEND VALIDATION
  describe("SignUpPage form validation", () => {
    it("shows required field errors when empty", async () => {
      renderWithProviders(<SignUpPage />, {}, "/auth/signup");

      await user.click(screen.getByTestId("signup-button"));

      //? Check for required field errors
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();

      //? Password
      expect(
        screen.getByText(/Password must contain at least 8 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Password must contain at least one uppercase letter./i
        )
      ).toBeInTheDocument();
      expect(
        await screen.getByText(
          /Password must contain at least one lowercase letter./i
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText("Please confirm your password")
      ).toBeInTheDocument();
    });

    it("shows password field error if password has less than 8 characters", async () => {
      renderWithProviders(<SignUpPage />, {}, "/auth/signup");

      await user.type(
        screen.getByTestId("password-input"),
        mockPassword.shortPassword
      ); //? Password with less than 8 characters
      await user.click(screen.getByTestId("signup-button"));

      expect(
        screen.getByText(/Password must contain at least 8 characters/i)
      ).toBeInTheDocument();
    });

    it("shows password field error if password does not have at least one upper case letter.", async () => {
      renderWithProviders(<SignUpPage />, {}, "/auth/signup");

      await user.type(
        screen.getByTestId("password-input"),
        mockPassword.missingUpperCaseLetter
      );

      await user.click(screen.getByTestId("signup-button"));

      expect(
        screen.getByText(
          /Password must contain at least one uppercase letter./i
        )
      ).toBeInTheDocument();
    });

    it("shows password field error if password does not have at least one lower case letter.", async () => {
      renderWithProviders(<SignUpPage />, {}, "/auth/signup");

      await user.type(
        screen.getByTestId("password-input"),
        mockPassword.missingLowerCaseLetter
      );

      await user.click(screen.getByTestId("signup-button"));

      expect(
        screen.getByText(/Password must contain at least one lowercase letter./)
      ).toBeInTheDocument();
    });

    it("shows confirm password field error when the password and confirm password do not match.,", async () => {
      renderWithProviders(<SignUpPage />, {}, "/auth/signup");

      await user.type(
        screen.getByTestId("password-input"),
        mockPassword.passwordMismatch
      );
      await user.type(
        screen.getByPlaceholderText("Confirm Password"),
        mockPassword.confirmPasswordMismatch
      );

      // await user.click(screen.getByTestId("signup-button"));

      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
  });
});
