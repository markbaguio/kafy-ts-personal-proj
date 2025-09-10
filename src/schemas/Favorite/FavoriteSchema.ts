import z from "zod";

export const FavoriteSchema = z.object({
  id: z.number().nonnegative(),
  user_id: z.string(),
  product_id: z.number().nonnegative(),
  created_at: z.string(),
});

export const AddToFavoriteResponseSchema = FavoriteSchema.pick({
  user_id: true,
  product_id: true,
});
