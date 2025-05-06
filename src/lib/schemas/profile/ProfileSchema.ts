import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().nullable(),
  createdAt: z.coerce.date(),
});
