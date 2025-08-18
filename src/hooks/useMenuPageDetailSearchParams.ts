import { ProductSizeSchema } from "@/schemas/Menu/ProductSchema";
import { useSearchParams } from "react-router";
import { z } from "zod";

const MenuPageDetailSchema = z.object({
  size: ProductSizeSchema,
  quantity: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .default("1"),
});

export default function useMenuDetailPageSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawMenudDetailPageSearchParams = {
    size: searchParams.get(`size`) ?? "S",
    quantity: searchParams.get("quantity"),
  };

  const parsedrMenudDetailPageSearchParams = MenuPageDetailSchema.safeParse(
    rawMenudDetailPageSearchParams
  );

  if (!parsedrMenudDetailPageSearchParams.success) {
    //? if the parse fails. Return default values.
    return {
      quantity: "1",
      size: "S",
      setSearchParams,
    };
  }

  return {
    quantity: parsedrMenudDetailPageSearchParams.data.quantity,
    size: parsedrMenudDetailPageSearchParams.data.size,
    setSearchParams,
  };
}

// export default function useMenuPageDetaileSearchParams(
//   ...inputParams: string[]
// ): Record<string, string | null> {
//   //   const result: Record<string, string | null> = {};
//   const defaultMenuPageDetailSearchParams: Record<string, string | null> = {};

//   inputParams.forEach((param) => {
//     defaultMenuPageDetailSearchParams[param] = param;
//   });

//   const [searchParams, setSearchParams] = useSearchParams(defaultMenuPageDetailSearchParams);

//   //   inputParams.forEach((inputParam) => {
//   //     result[inputParam] = inputParam;
//   //   });

//   return result;
// }
