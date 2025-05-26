import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignInPage } from "./SignInPage";
import { renderWithProviders } from "@/lib/test-utils";
import { UserSignInSchema } from "@/schemas/auth/UserSignInFormSchema";
import * as authServiceApi from "@/services/authServiceApi";
import { SignInPayload } from "@/services/authServiceApi";
import { ApiResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/types";
import { successfulSignInProfileData } from "@/mocks/mockData/mockData";

vi.mock("@/services/authServiceApi", () => ({
  signInUser: vi.fn(),
}));

const user = userEvent.setup();

describe("SignInPage", () => {
  it("renders the SignInPage component", () => {
    renderWithProviders(<SignInPage />, {}, "/auth/signin");
    expect(
      screen.getByRole("heading", { name: /Login to your account/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        "Sign up now and start earning Kaffy Coins with every purchase!"
      )
    );
  });

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

  describe("Sign in user submit logic", () => {
    it("calls signInUser with correct payload", async () => {
      const mockPayload: SignInPayload = {
        email: "test@example.com",
        password: "securePassword123",
      };

      const mockResponse: ApiResponse<Profile> = {
        statusCode: 200,
        data: successfulSignInProfileData?.data,
      };

      const mockedSignInUser = vi.mocked(authServiceApi.signInUser);
      mockedSignInUser.mockResolvedValueOnce(mockResponse);

      const result: ApiResponse<Profile> = await authServiceApi.signInUser(
        mockPayload
      );

      console.log(result);

      expect(mockedSignInUser).toHaveBeenCalledTimes(1);
      expect(mockedSignInUser).toHaveBeenCalledWith(mockPayload);
      expect(result).toEqual(mockResponse);
    });
  });
});
