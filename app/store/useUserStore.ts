/**
 * ⚠️ DEPRECATED: This store is no longer used
 * The app has been simplified to use Context API (AuthProvider) instead of Zustand
 * See app/providers/AuthProvider.tsx for the current authentication setup
 * Use useAuth() hook from @/hooks/useAuth instead
 */

"use client";

import { create } from "zustand";

type Role = "CANDIDATE" | "RECRUITER" | "ADMIN" | "SUPER_ADMIN";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: Role;
  profile?: {
    avatar?: string | null;
    profileTitle?: string | null;
  };
}

interface UserState {
  user: User | null;
  loading: boolean;
  initialized: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
  setInitialized: (val: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  initialized: false,

  setUser: (user) => set({ user, loading: false }),
  setLoading: (loading) => set({ loading }),
  clearUser: () => set({ user: null, loading: false }),
  setInitialized: (val) => set({ initialized: val }),
}));