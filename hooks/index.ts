import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

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

  return {
    notes,
    isPending,
    error,
    refetch,
    isRefetching,
  };
}
