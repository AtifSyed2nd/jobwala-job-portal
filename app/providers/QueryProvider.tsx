/**
 * ⚠️ DEPRECATED: This provider is no longer used
 * The app has been simplified to use Context API (AuthProvider) instead of TanStack Query
 * See app/providers/AuthProvider.tsx for the current authentication setup
 */

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}