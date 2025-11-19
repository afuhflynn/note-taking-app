/**
 * =================================
 * API Client
 *
 *
 * =================================
 */

import { privateAxios } from "@/config/axios.config";
import { CurrentNote, NewNotes, UpdateNoteData } from "@/types/TYPES";
import { Note, Tag, User } from "@prisma/client";

// Helper function for making authenticated requests
async function apiRequest<T>(
  endpoint: string,
  options: {
    body?: any;
    method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
  }
): Promise<T | null> {
  switch (options.method) {
    case "GET":
      try {
        const response = await privateAxios.get<any | null>(
          endpoint,
          options.body ?? {}
        );

        const data = response?.data;
        return data;
      } catch (error: Error | any) {
        if (error.response?.data) throw new Error(error.response?.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "DELETE":
      try {
        const response = await privateAxios.delete<any | null>(
          endpoint,
          options.body ?? {}
        );

        const data = response?.data;
        return data;
      } catch (error: Error | any) {
        if (error.response?.data) throw new Error(error.response?.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "POST":
      try {
        const response = await privateAxios.post<any | null>(
          endpoint,
          options.body ?? {}
        );
        const data = response?.data;
        return data;
      } catch (error: Error | any) {
        if (error.response?.data) throw new Error(error.response?.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "PUT":
      try {
        const response = await privateAxios.put<any | null>(
          endpoint,
          options.body ?? {}
        );
        const data = response?.data;
        return data;
      } catch (error: Error | any) {
        if (error.response?.data) throw new Error(error.response?.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    case "PATCH":
      try {
        const response = await privateAxios.patch<any | null>(
          endpoint,
          options.body ?? {}
        );
        const data = response?.data;
        return data;
      } catch (error: Error | any) {
        if (error.response?.data) throw new Error(error.response?.data.error);
        else throw new Error("Sorry, an unexpected error occurred");
      }
      break;

    default:
      console.error("Invalid HTTP method");
      return null;
      break;
  }
}

// API Methods
export const api = {
  user: {
    getUserData: async () =>
      await apiRequest<User>("/user/get-user-profile", {
        method: "GET",
      }),
  },
  note: {
    getAll: async (params: any) =>
      await apiRequest<CurrentNote[]>(`/notes?${params}`, {
        method: "GET",
      }),

    getSingle: async ({ noteId }: { noteId: string }) =>
      await apiRequest<CurrentNote>(`/notes/${noteId}`, { method: "GET" }),

    create: async (data: NewNotes) =>
      apiRequest<CurrentNote>("/notes", { method: "POST", body: data }),
    update: async (data: UpdateNoteData, id: string) =>
      apiRequest<CurrentNote>(`/notes/${id}`, { method: "PUT", body: data }),
    archive: async (id: string) =>
      apiRequest<CurrentNote>(`/notes/${id}`, { method: "PATCH" }),
    delete: async (id: string) =>
      apiRequest<CurrentNote>(`/notes/${id}`, { method: "DELETE" }),
  },
  tag: {
    getAll: async () => await apiRequest<Tag[]>("/tags", { method: "GET" }),
  },
};
