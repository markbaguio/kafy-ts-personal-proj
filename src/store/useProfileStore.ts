import { Profile } from "@/models/Profile";
import { create } from "zustand";

export type ProfileStore = {
  profile: Profile | null;
  updateProfile: (profile: Profile) => void;
  deleteProfile: () => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  updateProfile: (profile) => set({ profile }),
  deleteProfile: () => set({ profile: null }),
}));
