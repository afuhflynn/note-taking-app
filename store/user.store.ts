import { UserStore } from "@/types/TYPES";
import { privateAxios } from "@/utils/axios.config";
import { create } from "zustand";
import { User } from "@prisma/client";

export const controller = new AbortController(); // Controlling and aborting signals

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  error: null,

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
      set({ error });
      console.error(error);
    } finally {
      set({ isAuthenticated: true });
    }
  },
}));
