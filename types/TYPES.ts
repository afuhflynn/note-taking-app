import { signUpSchema } from "@/zod/zod.schema";
import { User } from "@prisma/client";
import { z } from "zod";

export interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  error: string | null | undefined;
  setError: (error: string | any) => void;
  message: string | null | undefined;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string | any) => void;
  isGettingUserProfile: boolean;
  isAuthenticated: boolean;
  getUserProfile: () => void;
  signUpUser: ({ email }: { email: string }) => void;
}

interface Note {
  id: string;
  title: string;
  tags: string[];
  updatedAt: Date;
}
export interface AppStore {
  prefersTheme: string | "system" | "light" | "dark";
  setPrefersTheme: (value: string | "system" | "light" | "dark") => void;
  currentNote: Note | null;
  setCurrentNote: (note: Note) => void;
  fetchCurrentNote: (noteId: string) => void;
}
