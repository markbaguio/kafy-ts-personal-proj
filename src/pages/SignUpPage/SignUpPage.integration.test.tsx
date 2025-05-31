import { AUTH_SIGN_UP, BASE_URL } from "@/constants";
import { renderWithProviders } from "@/lib/test-utils";
import { mockServer } from "@/mocks/server/server";
import { QueryClient } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import SignUpPage from "./SignUpPage";
import { signUpPayload } from "@/services/authServiceApi";
import { screen } from "@testing-library/react";
import { UserSignUpRequestBody } from "@/mocks/handlers/handlers";
import { ApiErrorResponse } from "@/models/ApiResponse";

const user = userEvent.setup();
const queryClient = new QueryClient();

type mockSignUpDataType = signUpPayload & {
  invalidEmail: string;
  invalidShortPassword: string;
  invalidTooLongPassword: string;
  invalidMissingUppercaseLetterPassword: string;
  invalidMissingLowercaseLetterPassword: string;
};

const mockSignUpData: mockSignUpDataType = {
  firstName: "Test",
  lastName: "Test",
  email: "signuptest@gmail.com",
  password: "12345678Test",
  confirmPassword: "12345678Test",
  invalidEmail: "invalidEmail",
  invalidShortPassword: "short",
  invalidMissingLowercaseLetterPassword: "12345678T",
  invalidMissingUppercaseLetterPassword: "12345678test",
  invalidTooLongPassword: "123456789Test12345678910111213",
};

describe("SignUpPage", () => {
  describe("Failure flow", () => {
    it("renders AuthErrorFallback when unexpected error occurs during sign-up", async () => {
      mockServer.use(
        http.post<{}, UserSignUpRequestBody, ApiErrorResponse>(
          `${BASE_URL}${AUTH_SIGN_UP}`,
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
      renderWithProviders(<SignUpPage />, {}, "/auth/signup");

      await user.type(
        screen.getByTestId("first-name-input"),
        mockSignUpData.firstName
      );
      await user.type(
        screen.getByTestId("last-name-input"),
        mockSignUpData.lastName
      );
      await user.type(screen.getByTestId("email-input"), mockSignUpData.email);
      await user.type(
        screen.getByTestId("password-input"),
        mockSignUpData.password
      );
      await user.type(
        screen.getByTestId("confirm-password-input"),
        mockSignUpData.confirmPassword
      );
      await user.click(screen.getByTestId("signup-button"));

      expect(
        await screen.findByText(/Whoops! Something went wrong/i)
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Retry/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Home/i })).toBeInTheDocument();
    });

    //? FRONTEND VALIDATION
    it("shows field errors when inputs are empty", async () => {
      renderWithProviders(<SignUpPage />, {}, "/auth/signup");

      await user.click(screen.getByTestId("signup-button"));
      // screen.debug(undefined, Infinity);

      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Password must contain at least 8 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Password must contain at least one uppercase letter./i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Password must contain at least one lowercase letter./i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Please confirm your password/i)
      ).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("shows a toast when network error occurs", async () => {
      mockServer.use(
        http.post(`${BASE_URL}${AUTH_SIGN_UP}`, () => {
          return HttpResponse.error();
        })
      );

      renderWithProviders(<SignUpPage />, {}, "/auth/signup");

      await user.type(
        screen.getByTestId("first-name-input"),
        mockSignUpData.firstName
      );
      await user.type(
        screen.getByTestId("last-name-input"),
        mockSignUpData.lastName
      );
      await user.type(screen.getByTestId("email-input"), mockSignUpData.email);
      await user.type(
        screen.getByTestId("password-input"),
        mockSignUpData.password
      );
      await user.type(
        screen.getByTestId("confirm-password-input"),
        mockSignUpData.confirmPassword
      );
      await user.click(screen.getByTestId("signup-button"));

      expect(
        await screen.findByText(
          /Unable to reach server. Please check your internet connection./i
        )
      ).toBeInTheDocument();
    });
  });
});
