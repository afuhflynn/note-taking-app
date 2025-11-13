import { api } from "@/lib/api-client";
import { useAppStore } from "@/store/app.store";
import { CurrentNote, NewNotes } from "@/types/TYPES";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const queryClient = new QueryClient();

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

export function useNotes() {
  const {
    data: notes,
    isPending,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryFn: api.note.getAll,
    queryKey: ["user-notes"],
    gcTime: 0,
    staleTime: 30 * 60 * 1000, // 30 mins
  });

  console.log({ notes });

  return {
    notes,
    isPending,
    error,
    refetch,
    isRefetching,
  };
}

export function useCreateNote(data: NewNotes) {
  const { setNewNote, setCurrentNote } = useAppStore();
  const router = useRouter();
  const { mutate, error, isPending } = useMutation({
    mutationFn: async () => await api.note.create(data),
    mutationKey: ["create-note", data.content],
    onSuccess(data) {
      console.log({ data });

      queryClient.invalidateQueries({ queryKey: ["user-notes"] });
      toast.success("Note created succesfully");
      router.push(
        `/notes?note=${data?.title.replaceAll(" ", "-")}&id=${data?.id}`
      );
      setCurrentNote(data as CurrentNote);
      setNewNote(null);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return {
    create: mutate,
    isPending,
    error,
  };
}
