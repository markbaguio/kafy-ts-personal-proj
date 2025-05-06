import { z } from "zod";

export const UserSignUpFormSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(25, "Password must not exceed 25 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter."),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// const UserSignUpFormSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   email: z.string(),
//   password: z.string(),
//   confirmPassword: z.string(),
// });
