import { setupServer } from "msw/node";
import { handlers } from "../handlers/handlers";

// export const server = setupServer(...Object.values(authHandlersMock));
export const mockServer = setupServer(...handlers);

mockServer.events.on("request:start", ({ request }) => {
  console.log("MSW intercepted:", request.method, request.url);
});
