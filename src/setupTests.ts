import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockServer } from "./mocks/server/server";

beforeAll(() => {
  mockServer.listen();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});
