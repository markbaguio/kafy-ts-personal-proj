import { ApiResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/types";

export const successfulSignInData: ApiResponse<Profile> = {
  statusCode: 200,
  data: {
    avatar_url: "",
    id: "123",
    created_at: new Date(),
    email: "test@gmail.com",
    first_name: "test",
    last_name: "test",
  },
};
