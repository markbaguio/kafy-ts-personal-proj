import { z } from "zod";

export const ProfileSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  avatar_url: z.string().nullable(),
  // created_at: z.coerce.date(),
  created_at: z.string(),
  // updated_at: z.coerce.date().nullable(),
  updated_at: z.string().nullable(),
});
