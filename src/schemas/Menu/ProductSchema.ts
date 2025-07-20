import z from "zod";

export const ProductSchema = z.object({
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

const PaginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
  itemsPerPage: z.number(),
  hasNextPage: z.boolean(),
});

export const PaginatedProductsSchema = z.object({
  pagination: PaginationSchema,
  products: z.array(ProductSchema),
});
