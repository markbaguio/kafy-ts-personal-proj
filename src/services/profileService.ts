import { ApiResponse } from "@/models/ApiResponse";
import { Profile } from "@/models/types";
import axios from "axios";

const dateString = "2025-04-06T07:53:20.103983+00:00";
const date = new Date(dateString);
const mockProfile: Profile = {
  id: "fce5023b-4a71-41fb-b2c0-ced50f9e0e6f",
  created_at: date,
  first_name: "Mark",
  last_name: "Baguio",
  avatar_url: null,
  email: "godwinbaguio@gmail.com",
  updated_at: null,
};

export async function getProfile(): Promise<ApiResponse<Profile>> {
  //? ------------------- for testing purposes only -------------------
  console.log("Fetching profile...");
  await new Promise((resolve) => setTimeout(resolve, 500)); //? Simulate network delay
  // useAuthStore.setState({ profile: mockProfile });

  return {
    data: mockProfile,
    statusCode: 200,
  };
  //? ----------------------------------------------------------------

  //? Proper code to fetch profile from API goes here.
}
