import { useSearchParams } from "react-router";
import { z } from "zod";

export const MenuCategoryEnum = z
  .enum(["hot", "cold", "pastries", "snacks", "lunch", "treats"])
  .default("hot");

export enum MenuCategory {
  hot = "hot",
  cold = "cold",
  pastries = "pastries",
  snacks = "snacks",
  lunch = "lunch",
  treats = "treats",
}

export type MenuCategoryType =
  | "hot"
  | "cold"
  | "pastries"
  | "snacks"
  | "lunch"
  | "treats";

const MenuPageSearchParamsSchema = z.object({
  category: MenuCategoryEnum,
  page: z.string().regex(/^\d+$/).transform(String).default("1"),
});

export function useMenuPageSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultMenuPageSearchParams = {
    category: searchParams.get("category") ?? "hot",
    page: searchParams.get("page") ?? "1",
  };

  const parsedMenuPageSearchParams = MenuPageSearchParamsSchema.safeParse(
    defaultMenuPageSearchParams
  );

  if (!parsedMenuPageSearchParams.success) {
    //? if the parse fails / wrong search Params. Return default values.
    return {
      category: "hot",
      page: "1",
      searchParams,
      setSearchParams,
    };
  }

  return {
    ...parsedMenuPageSearchParams.data,
    searchParams,
    setSearchParams,
  };
}
