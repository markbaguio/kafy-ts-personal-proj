import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignInPage } from "./SignInPage";
import { renderWithProviders } from "@/lib/test-utils";
import { UserSignInSchema } from "@/schemas/auth/UserSignInFormSchema";

describe("SignInPage", () => {
  const user = userEvent.setup();
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

  // it("shows a network error toast when there's a connection problem", async () => {
  //   renderWithProviders(<SignInPage />);
  //   const loginButton: HTMLButtonElement = screen.getByTestId("login-button");
  //   const emailInput: HTMLInputElement = screen.getByPlaceholderText("Email");
  //   const passwordInput: HTMLInputElement =
  //     screen.getByPlaceholderText("Password");
  //   fireEvent.change(emailInput, { target: { value: "text@gmail.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "testpassword" } });
  //   await user.click(loginButton);
  //   expect(
  //     await screen.findByText(
  //       /Unable to reach server. Please check your internet connection./i
  //     )
  //   ).toBeInTheDocument();
  // });
});
