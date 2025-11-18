import { AppStore, CurrentNote } from "@/types/TYPES";
import { create } from "zustand";

export const useAppStore = create<AppStore>((set, get) => ({
  prefersTheme: "system",
  setPrefersTheme(value) {
    set({ prefersTheme: value });
  },
  currentNote: null,
  setCurrentNote(note) {
    const tags = note?.tags.map((item) => item.name);
    set({
      currentNote: note,
      editTitle: note?.title,
      editTags: tags?.join(", "),
      editContent: note?.content,
    });
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
    set({
      editTags,
    });
  },
  editTitle: "",
  setEditTitle(editTitle) {
    set({
      editTitle,
    });
  },

  editContent: "",
  setEditContent(editContent) {
    set({ editContent });
  },

  contentUpdated: false,
  setContentUpdated(value) {
    set({ contentUpdated: value });
  },
}));
