import type { User } from "@/types/user";
import { create } from "zustand";

type UserState = {
  user: User | null;
};

type UserActions = {
  setUser: (user: User | null) => void;
  logout: () => void;
};

const initialState: UserState = {
  user: null,
};

export const useUserStore = create<{ state: UserState; actions: UserActions }>(
  (set) => ({
    state: { ...initialState },
    actions: {
      setUser: (user) => set((store) => ({ state: { ...store.state, user } })),
      logout: () => {
        localStorage.removeItem("token");
        set({ state: { ...initialState } });
      },
    },
  })
);
