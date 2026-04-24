"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";

export function useAuth() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: () => apiFetch("/api/auth/me"),
    retry: false, // ❌ don't retry 401
    staleTime: 1000 * 60 * 5, // ✅ 5 min cache
  });

  const user = data?.data?.user ?? null;

  // ✅ logout helper
  const logout = async () => {
    await apiFetch("/api/auth/logout", { method: "DELETE" });

    queryClient.setQueryData(["authUser"], null);
  };

  // ✅ refetch helper
  const refetchUser = async () => {
    await queryClient.invalidateQueries({ queryKey: ["authUser"] });
  };

  return {
    user,
    loading: isLoading || isFetching,
    refetchUser,
    logout,
  };
}