import { ApiResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/types";

export const successfulAuthResponse: ApiResponse<Profile> = {
  statusCode: 200,
  data: {
    avatar_url: "",
    id: "9a3b783a-a897-419d-a5aa-be9c981764d0",
    created_at: new Date(),
    email: "usertest@gmail.com",
    first_name: "test",
    last_name: "test",
  },
};
