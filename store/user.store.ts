import { UserStore } from "@/types/TYPES";
import { create } from "zustand";
import { User } from "@prisma/client";
import { privateAxios } from "@/config/axios.config";

export const controller = new AbortController(); // Controlling and aborting signals

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  error: null,
  loading: false,

  setError: (error) => {
    set({ error });
  },
  message: null,
  setMessage(message) {
    set({ message });
  },
  setUser: (user) => {
    set({ user });
  },
  isAuthenticated: false,
  isGettingUserProfile: false,
  getUserProfile: async () => {
    set({ isAuthenticated: true });
    try {
      const response = await privateAxios.get<{ user: User; message: string }>(
        "/api/user/get-user-profile",
        {
          signal: controller.signal,
        }
      );
      set({
        user: response.data.user as User,
        message: response.data.message as string,
        isAuthenticated: true,
      });
      controller.abort("Fetch complete");
    } catch (error: Error | any) {
      set({ error: "" });
      if (error.response.data) set({ error: error.response.data.error });
      else
        set({
          error:
            "Sorry, an unexpected error occurred. Can not get user info at the moment.",
        });
      console.error(error);
    } finally {
      set({ isAuthenticated: true });
    }
  },
  signUp: async (data) => {
    set({ loading: true, message: null, error: null });
    try {
      const result = await privateAxios.post<{ message: string }>(
        "/api/user/sign-up",
        {
          email: data.email,
          password: data.password,
        }
      );
      set({ message: result.data.message });
    } catch (error: Error | any) {
      if (error.response.data) set({ error: error.response.data.error });
      else
        set({ error: "Sorry, an unexpected error occurred. Try again later." });
    } finally {
      set({ loading: false });
    }
  },
}));
