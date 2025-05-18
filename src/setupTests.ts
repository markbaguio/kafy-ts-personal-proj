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

//? These mocks are needed for embla-carousel to work in integration test. (Intersection Observermock, ResizeObserver mock, matchMedia mock )
//? Source/s:
//? https://github.com/davidjerleke/embla-carousel/issues/837#issuecomment-2073969586
//? https://github.com/davidjerleke/embla-carousel/issues/1009
// IntersectionObserver mock
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

// ResizeObserver mock
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

// matchMedia mock
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
