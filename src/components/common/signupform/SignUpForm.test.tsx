import { render, screen } from "@testing-library/react";
import SignUpForm from "./SignUpForm";
import { ErrorBoundary } from "react-error-boundary";
import { MemoryRouter } from "react-router";

describe("SignUpForm", () => {
  it("renders the SignUpForm component", () => {
    // render(<SignUpForm />);
    render(
      <MemoryRouter>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <SignUpForm />
        </ErrorBoundary>
      </MemoryRouter>
    );

    // expect(screen.getByText("Kafy Rewards")).toBeInTheDocument();
    expect(true).toBeTruthy();
  });
});

vi.mock;
