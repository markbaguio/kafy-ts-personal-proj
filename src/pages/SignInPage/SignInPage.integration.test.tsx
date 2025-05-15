import { screen, waitFor } from "@testing-library/react";
import { mockServer } from "@/mocks/server/server";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";
import { AUTH_SIGN_IN, BASE_URL } from "@/constants";
import { renderWithProviders } from "@/lib/test-utils";
import { SignInPage } from "./SignInPage";

describe("SignInPage", () => {
  const user = userEvent.setup();

  it("shows a toast when network error occurs", async () => {
    mockServer.use(
      http.post(`${BASE_URL}${AUTH_SIGN_IN}`, () => {
        HttpResponse.error();
      })
    );

    // render the component
    renderWithProviders(<SignInPage />, {}, "/auth/signin");

    // fill up the input fields with mock credentials
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "12345678Password");

    // click the login button
    await user.click(screen.getByTestId("login-button"));

    await waitFor(async () => {
      const toast = await screen.findByText(
        /Unable to reach server. Please check your internet connection./i
      );
      expect(toast).toBeInTheDocument();
    });
    // expect(
    //   await screen.findByText(
    //     /Unable to reach server. Please check your internet connection./i
    //   )
    // ).toBeInTheDocument();
  });

  it("signs in successfully and redirects to homepage", () => {
    mockServer;
  });
});
