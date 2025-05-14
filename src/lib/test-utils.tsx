import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MemoryRouter } from "react-router";
import { Toaster } from "sonner";

export function renderWithProviders(
  ui: ReactNode,
  options = {},
  initialURL: string = "/"
) {
  const queryClient = new QueryClient();
  return render(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Toaster />
      <MemoryRouter initialEntries={[initialURL]}>
        <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
      </MemoryRouter>
    </ErrorBoundary>,
    options
  );
}
