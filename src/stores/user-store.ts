import { create } from "zustand";

interface User {
  _id: string;
  role: string;
  email: string;
  name: string;
  title: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));
