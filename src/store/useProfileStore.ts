import { Profile } from "@/models/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProfileStore = {
  profile: Profile | null;
  updateProfile: (profile: Profile) => void;
  deleteProfile: () => void;
};

// export const useProfileStore = create<ProfileStore>((set) => ({
//   profile: null,
//   updateProfile: (profile) => set({ profile }),
//   deleteProfile: () => set({ profile: null }),
// }));

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      updateProfile: (profile) => set({ profile }),
      deleteProfile: () => set({ profile: null }),
    }),
    {
      name: "profile-store",
      partialize: (state: ProfileStore) => ({ profile: state.profile }),
      // onRehydrateStorage: (state: ProfileStore) => {
      //   return (state, error) => {
      //     // if (error) throw new Error("An error occurred during hydration");
      //     if (error) console.log("An error occurred during hydration", error);
      //     else console.log("Hydration successful");
      //   };
      // },
    }
  )
);
