import { Note, Tag, User } from "@prisma/client";

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

export interface AppStore {
  prefersTheme: string | "system" | "light" | "dark";
  setPrefersTheme: (value: string | "system" | "light" | "dark") => void;
  currentNote: CurrentNote | null;
  setCurrentNote: (note: CurrentNote) => void;
  fetchCurrentNote: (noteId: string) => void;
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  newNote: NewNotes | null;
  setNewNote: (newNote: NewNotes | null) => void;
}

export interface NewNotes {
  title: string;
  content?: string;
  tags?: string;
}
