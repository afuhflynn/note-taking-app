import { Note, Tag, User } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export interface UserStore {
  error: string | null | undefined;
  setError: (error: string | any) => void;
  message: string | null | undefined;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string | any) => void;
  signUpUser: ({ email }: { email: string }) => void;
}

export interface CurrentNote extends Note {
  tags: Tag[];
}

export type UpdateNoteData = {
  title: string;
  tags: string;
  content: JsonValue;
  id: string;
  size: number;
};

export interface AppStore {
  prefersTheme: string | "system" | "light" | "dark";
  setPrefersTheme: (value: string | "system" | "light" | "dark") => void;
  currentNote: CurrentNote | null;
  setCurrentNote: (note: CurrentNote | null) => void;
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  newNote: NewNote | null;
  setNewNote: (newNote: NewNote | null) => void;
  isEditingTitle: boolean;
  setIsEditingTitle: (isEditingTitle: boolean) => void;
  isEditingTags: boolean;
  setIsEditingTags: (isEditingTags: boolean) => void;
  isEditingContent: boolean;
  setIsEditingContent: (isEditingContent: boolean) => void;
  editTitle: string;
  setEditTitle: (editTitle: string) => void;
  editTags: string;
  setEditTags: (editTags: string) => void;
  editContent: JsonValue;
  setEditContent: (editContent: JsonValue) => void;
  contentUpdated: boolean;
  setContentUpdated: (value: boolean) => void;
  setSearchQuery: (value: string) => void;
  searchQuery: string | null;
}

export interface NewNote {
  title?: string;
  content?: string;
  tags?: string;
  size?: number;
}

export interface UtilTypes {
  filter: string | null;
  query: string | null;
  tag: string | null;
}

export type ModalTypes =
  | "create-note"
  | "settings"
  | "upload-image"
  | "upload-youtube"
  | "delete-note"
  | "share-note"
  | "save-note"
  | "version-history";
