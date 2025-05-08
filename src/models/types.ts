import { ProfileSchema } from "@/lib/schemas/profile/ProfileSchema";
import { z } from "zod";

export type Profile = z.infer<typeof ProfileSchema>;
