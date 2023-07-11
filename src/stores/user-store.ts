import { User } from "@/types/user";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));
