import { z } from "zod";

// mock profile ID fce5023b-4a71-41fb-b2c0-ced50f9e0e6f

export const CreateOrderSchema = z.object({
  //? id will be created on post/insert into the database.
  //? status has a default value
  //? created_at will be set on the backend before inserting to the db
  total_amount: z.number().nonnegative(),
  profile_id: z.string(),
});
