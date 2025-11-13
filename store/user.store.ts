import { UserStore } from "@/types/TYPES";
import { create } from "zustand";
import { User } from "@prisma/client";
import { privateAxios } from "@/config/axios.config";

export const useUserStore = create<UserStore>((set, get) => ({
  error: null,
  loading: false,

  setLoading: (loading) => {
    set({ loading });
  },
  setError: (error) => {
    set({ error });
  },
  message: null,
  setMessage(message) {
    set({ message });
  },
  signUpUser: async (data) => {
    set({ loading: true, message: null, error: null });
    try {
      const result = await privateAxios.post<{ message: string }>(
        "/user/sign-up",
        {
          email: data.email,
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
