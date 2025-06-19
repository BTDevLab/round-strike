import type { User } from "@/types/user";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
