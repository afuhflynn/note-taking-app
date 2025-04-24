import { User } from "@prisma/client";

export interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  error: string | null | undefined;
  setError: (error: string | any) => void;
  message: string | null | undefined;
  setMessage: (message: string | any) => void;
  isGettingUserProfile: boolean;
  isAuthenticated: boolean;
  getUserProfile: () => void;
}
export interface AppStore {
  prefersTheme: string | "system" | "light" | "dark";
  setPrefersTheme: (value: string | "system" | "light" | "dark") => void;
}
