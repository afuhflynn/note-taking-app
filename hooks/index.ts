import { searchParamsSchema } from "@/components/nuqs";
import { api } from "@/lib/api-client";
import { useAppStore } from "@/store/app.store";
import { CurrentNote, NewNote, UpdateNoteData, UtilTypes } from "@/types/TYPES";
import { constrcutParams } from "@/utils";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

// ==================== USER DATA ====================
export function useUserData() {
  const {
    data: user,
    isPending,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["user-data"],
    queryFn: api.user.getUserData,
    staleTime: Infinity,
    gcTime: 0,
  });

  return {
    user,
    isPending,
    error,
    refetch,
    isRefetching,
  };
}

// ==================== GET ALL NOTES ====================
export function useNotes({ filter, query, tag }: UtilTypes) {
  const {
    data: notes,
    isPending,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryFn: async () => {
      const paramsString = constrcutParams({ filter, query, tag } as Record<
        string,
        string
      >);

      return await api.note.getAll(paramsString);
    },
    queryKey: ["user-notes", filter, query, tag],
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  return {
    notes,
    isPending,
    error,
    refetch,
    isRefetching,
  };
}

// ==================== CREATE NOTE ====================
export function useCreateNote() {
  const { setNewNote } = useAppStore();
  const router = useRouter();
  const queryClient = new QueryClient();

  const { mutate, error, isPending, mutateAsync } = useMutation({
    mutationFn: async (data: NewNote) => await api.note.create(data),
    mutationKey: ["create-note"],
    onSuccess: async (response) => {
      // Invalidate and refetch to ensure UI updates
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user-notes"] }),
        queryClient.invalidateQueries({ queryKey: ["user-notes-tags"] }),
      ]);

      toast.success("Note created successfully");
      setNewNote(null);

      // Navigate to the new note
      router.push(`/notes?id=${response?.id}`);
    },
    onError(error: any) {
      toast.error(error?.message || "Failed to create note");
    },
  });

  return {
    create: mutate,
    createAsync: mutateAsync,
    isPending,
    error,
  };
}

// ==================== GET SINGLE NOTE ====================
export function useNote(noteId: string, isEditing: boolean = false) {
  const { setCurrentNote } = useAppStore();
  const {
    data: note,
    isPending,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryFn: async () => await api.note.getSingle({ noteId }),
    queryKey: ["note", noteId],
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: isEditing ? 30000 : false, // Poll every 30s while editing
    enabled: !!noteId,
  });

  useEffect(() => {
    if (note) {
      setCurrentNote(note as CurrentNote);
    }
  }, [note, setCurrentNote]);

  return {
    note,
    isPending,
    error,
    refetch,
    isRefetching,
  };
}

// ==================== UPDATE NOTE ====================
export function useUpdateNote() {
  const queryClient = useQueryClient();
  const { setCurrentNote } = useAppStore();

  const { mutate, mutateAsync, error, isPending } = useMutation({
    mutationFn: async (data: UpdateNoteData) =>
      await api.note.update(data, data.id),

    // Optimistic update for instant UI feedback
    onMutate: async (updatedNote) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["note", updatedNote.id] });
      await queryClient.cancelQueries({ queryKey: ["user-notes"] });

      // Snapshot the previous values
      const previousNote = queryClient.getQueryData(["note", updatedNote.id]);
      const previousNotes = queryClient.getQueryData(["user-notes"]);

      return { previousNote, previousNotes };
    },

    onError: (err, updatedNote, context) => {
      // Rollback on error
      if (context?.previousNote) {
        queryClient.setQueryData(
          ["note", updatedNote.id],
          context.previousNote,
        );
      }
      if (context?.previousNotes) {
        queryClient.setQueryData(["user-notes"], context.previousNotes);
      }

      toast.error("Failed to save note");
    },

    onSuccess: (data, variables) => {
      toast.success("Note saved successfully");

      // Update current note in store
      setCurrentNote(data);
      // Update with server response
      queryClient.setQueryData(["note", variables.id], data);
    },

    onSettled: (data, error, variables) => {
      // Always refetch to ensure sync with server
      queryClient.invalidateQueries({ queryKey: ["note", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["user-notes"] });
      queryClient.invalidateQueries({ queryKey: ["user-notes-tags"] });
    },
  });

  return {
    update: mutate,
    updateAsync: mutateAsync,
    isPending,
    error,
  };
}

// ==================== DELETE NOTE ====================
export function useDeleteNote({ filter, query, tag }: UtilTypes) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setCurrentNote } = useAppStore();

  const { mutate, error, isPending } = useMutation({
    mutationFn: async (noteId: string) => await api.note.delete(noteId),

    onMutate: async (noteId) => {
      // Cancel queries
      await queryClient.cancelQueries({
        queryKey: ["user-notes", filter, query, tag],
      });

      // Snapshot
      const previousNotes = queryClient.getQueryData([
        "user-notes",
        filter,
        query,
        tag,
      ]);

      // Optimistically remove from list
      queryClient.setQueryData(
        ["user-notes", filter, query, tag],
        (old: any) => {
          if (!old) return old;
          return old.filter((note: any) => note.id !== noteId);
        },
      );

      return { previousNotes };
    },

    onError: (_err, _noteId, context) => {
      // Rollback
      if (context?.previousNotes) {
        queryClient.setQueryData(
          ["user-notes", filter, query, tag],
          context.previousNotes,
        );
      }
      toast.error("Failed to delete note");
    },

    onSuccess: (_data, noteId) => {
      toast.success("Note deleted successfully");

      // Remove from cache
      queryClient.removeQueries({ queryKey: ["note", noteId] });

      // empty current Note
      setCurrentNote(null);

      // Navigate away
      // router.push("/notes");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-notes", filter, query, tag],
      });
      queryClient.invalidateQueries({ queryKey: ["user-notes-tags"] });
    },
  });

  return {
    deleteNote: mutate,
    isPending,
    error,
  };
}

// ==================== ARCHIVE NOTE ====================
export function useArchiveNote({ filter, query, tag }: UtilTypes) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setCurrentNote } = useAppStore();

  const { mutate, error, isPending } = useMutation({
    mutationFn: async (noteId: string) => await api.note.archive(noteId),

    onMutate: async (noteId) => {
      // Cancel queries
      await queryClient.cancelQueries({
        queryKey: ["user-notes", filter, query, tag],
      });

      // Snapshot
      const previousNotes = queryClient.getQueryData([
        "user-notes",
        filter,
        query,
        tag,
      ]);

      // Optimistically remove from list
      queryClient.setQueryData(
        ["user-notes", filter, query, tag],
        (old: any) => {
          if (!old) return old;
          return old.filter((note: any) => note.id !== noteId);
        },
      );

      return { previousNotes };
    },

    onError: (_err, _noteId, context) => {
      // Rollback
      if (context?.previousNotes) {
        queryClient.setQueryData(
          ["user-notes", filter, query, tag],
          context.previousNotes,
        );
      }
      toast.error("Failed to archive note");
    },

    onSuccess: (_data, noteId) => {
      toast.success("Note archived successfully");

      // Remove from cache
      queryClient.removeQueries({ queryKey: ["note", noteId] });

      // empty current Note
      setCurrentNote(null);

      // Navigate away
      // router.push("/notes");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-notes"] });
      queryClient.invalidateQueries({ queryKey: ["user-notes-tags"] });
    },
  });

  return {
    arhiveNote: mutate,
    isPending,
    error,
  };
}

// ==================== GET ALL TAGS ====================
export function useTags() {
  const {
    data: tags,
    isPending,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryFn: api.tag.getAll,
    queryKey: ["user-notes-tags"],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  return {
    tags,
    isPending,
    error,
    refetch,
    isRefetching,
  };
}
