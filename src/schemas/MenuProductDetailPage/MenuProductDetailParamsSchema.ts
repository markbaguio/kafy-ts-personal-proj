import { z } from "zod";

export const MenuProductDetailPageParamsSchema = z.object({
  product_id: z.string().regex(/^\d+$/, "Product ID must be a number"),
});

export type MenuProductDetailPageParams = z.infer<
  typeof MenuProductDetailPageParamsSchema
>;

export const ProductSizeOptions: ProductSize[] = ["S", "M", "L"];
export type ProductSize = "S" | "M" | "L";
