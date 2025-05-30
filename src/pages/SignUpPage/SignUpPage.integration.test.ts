import { QueryClient } from "@tanstack/react-query";
import userEvent, { UserEvent } from "@testing-library/user-event";

const user = userEvent.setup();
const queryClient = new QueryClient();
