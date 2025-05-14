import { setupServer } from "msw/node";
import { authHandlersMock } from "../handlers/authHandlersMock";

// export const server = setupServer(...Object.values(authHandlersMock));
export const mockServer = setupServer(...authHandlersMock);

mockServer.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});
