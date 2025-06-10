import { Profile } from "@/models/types";
import { create } from "zustand";

export type AuthStore = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  isSignedIn: boolean;
  signOut: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  isSignedIn: false,
  signOut: () => {
    set({ profile: null, isSignedIn: false });
  },
}));
