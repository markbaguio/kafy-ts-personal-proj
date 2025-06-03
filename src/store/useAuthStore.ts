import { Profile } from "@/models/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// export type ProfileStore = {
//   profile: Profile | null;
//   updateProfile: (profile: Profile) => void;
//   deleteProfile: () => void;
// };

// export const useProfileStore = create<ProfileStore>()(
//   persist(
//     (set) => ({
//       profile: null,
//       updateProfile: (profile) => set({ profile }),
//       deleteProfile: () => set({ profile: null }),
//     }),
//     {
//       name: "profile-store",
//       partialize: (state: ProfileStore) => ({ profile: state.profile }),
//     }
//   )
// );

export type AuthStore = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  isSignedIn: boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      get isSignedIn() {
        return !!get().profile;
      },
    }),
    {
      name: "auth-store",
      partialize: (state: AuthStore) => ({ profile: state.profile }),
    }
  )
);
