import { dummyNoteItems } from "@/constants";
import { AppStore, CurrentNote } from "@/types/TYPES";
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
  notes: [],
  setNotes(notes) {
    set({ notes });
  },

  newNote: null,
  setNewNote(newNote) {
    set({ newNote });
  },

  fetchCurrentNote(noteId) {
    // @ts-ignore // TODO: remove this later
    const note = dummyNoteItems.find(
      (item) => item.id === noteId
    ) as CurrentNote;
    set({ currentNote: note });
  },
}));
