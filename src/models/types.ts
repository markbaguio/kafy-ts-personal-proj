import { ProductSchema } from "@/schemas/Menu/MenuSchema";
import { ProfileSchema } from "@/schemas/profile/ProfileSchema";
import { z } from "zod";

export type Profile = z.infer<typeof ProfileSchema>;

export type Product = z.infer<typeof ProductSchema>;
export enum ProductCategoryEnum {
  hot = "hot",
  cold = "cold",
}
