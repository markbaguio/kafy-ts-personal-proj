import z from "zod";

export const MenuItemSchema = z.object({
  id: z.number(),
  category: z.enum(["hot", "cold"]),
  created_at: z.string(),
  description: z.string(),
  image_url: z.string(),
  is_available: z.boolean(),
  name: z.string(),
  price: z.number(),
  updated_at: z.string().nullable(),
});

export type MenuItemType = z.infer<typeof MenuItemSchema>;
