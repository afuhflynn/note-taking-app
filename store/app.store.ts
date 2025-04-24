import { AppStore } from "@/types/TYPES";
import { create } from "zustand";

export const useAppStore = create<AppStore>((set, get) => ({
  prefersTheme: "system",
  setPrefersTheme(value) {
    set({ prefersTheme: value });
  },
}));
