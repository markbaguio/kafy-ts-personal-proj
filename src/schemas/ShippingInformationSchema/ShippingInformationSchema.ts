import z from "zod";

export const ShippingInformationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(11, "Phone number must not exceed 11 digits")
    .regex(/^\d+$/, "Phone number must be numeric"),
  address: z.string().min(1, "Address is required"),
  shippingMethod: z.enum(["delivery", "pickup"], {
    required_error: "Please select a shipping method.",
  }),
});
