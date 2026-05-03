"use client";

import { createContext, useContext, useState } from "react";

// Define the shape of our mock user
type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "RECRUITER" | "CANDIDATE";
  image?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Static AuthProvider for frontend-only development.
 * This removes all backend dependencies and uses hardcoded data.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 1. Hardcode the user directly in the initial state
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Atif Syed",
    email: "admin@jobportal.app",
    role: "ADMIN",
    image: "",
  });

  // 2. Set loading to false immediately since data is local
  const [loading] = useState(false);

  // 3. Static Logout: Just clear the state and redirect if needed
  const logout = async () => {
    setUser(null);
    console.log("Static Logout: User state cleared.");
  };

  // 4. Static Refetch: Does nothing as there is no backend to sync with
  const refetchUser = async () => {
    console.log("Static Refetch: No backend connected.");
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};