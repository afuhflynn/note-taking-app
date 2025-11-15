import { AppStore, CurrentNote } from "@/types/TYPES";
import { create } from "zustand";

export const useAppStore = create<AppStore>((set, get) => ({
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

  isEditingContent: false,
  setIsEditingContent(isEditingContent) {
    set({ isEditingContent });
  },
  isEditingTags: false,
  setIsEditingTags(isEditingTags) {
    set({ isEditingTags });
  },
  isEditingTitle: false,
  setIsEditingTitle(isEditingTitle) {
    set({ isEditingTitle });
  },

  editTags: "",
  setEditTags(editTags) {
    set({ editTags });
  },
  editTitle: "",
  setEditTitle(editTitle) {
    set({ editTitle });
  },

  editContent: "",
  setEditContent(editContent) {
    set({ editContent });
  },
}));
