import { dummyNoteItems } from "@/constants";
import { AppStore } from "@/types/TYPES";
import { create } from "zustand";

export const useAppStore = create<AppStore>((set) => ({
  prefersTheme: "system",
  setPrefersTheme(value) {
    set({ prefersTheme: value });
  },
  currentNote: null,
  setCurrentNote(note) {
    set({ currentNote: note });
  },
  fetchCurrentNote(noteId) {
    const note = dummyNoteItems.find((item) => item.id === noteId);
    set({ currentNote: note });
  },
}));
