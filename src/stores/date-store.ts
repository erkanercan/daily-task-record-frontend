import { create } from "zustand";

interface DateState {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const useDateStore = create<DateState>()((set) => ({
  selectedDate: new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ),
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
}));
