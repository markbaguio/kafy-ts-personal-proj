import { z } from "zod";

export const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  // email: z.string(),
  // password: z.string(),
});
