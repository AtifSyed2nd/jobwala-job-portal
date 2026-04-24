"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { getBasePath } from "@/lib/auth-utils";

export function UserNav() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { user, refetchUser } = useAuth();

  const basePath = getBasePath(user?.role);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await fetch("/api/auth/logout", {
        method: "DELETE",
        credentials: "include",
      });

      await refetchUser(); // ✅ CRITICAL FIX
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-10 w-10 rounded-full border hover:ring-2 hover:ring-blue-100">
          <Avatar className="h-full w-full">
            <AvatarImage src={user.profile?.avatar || ""} />
            <AvatarFallback>
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel>
          <p className="font-bold">{user.name}</p>
          <p className="text-xs text-slate-500">
            {user.role.toLowerCase()}
          </p>
          <p className="text-xs text-slate-500">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`${basePath}/profile`}>My Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`${basePath}/setting`}>Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} disabled={loading}>
          {loading ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}