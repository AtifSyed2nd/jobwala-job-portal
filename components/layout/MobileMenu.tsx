"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Home,
  Briefcase,
  Building2,
  PlusCircle,
  LogIn,
  UserCircle,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { getBasePath } from "@/lib/auth-utils";

export function MobileMenu() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { user, refetchUser } = useAuth();

  const isLoggedIn = !!user;
  const basePath = getBasePath(user?.role);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await fetch("/api/auth/logout", {
        method: "DELETE",
        credentials: "include",
      });

      await refetchUser();
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[300px]">
          <div className="flex flex-col gap-6 mt-8">

            <nav className="flex flex-col gap-4">
              <Link href="/">Home</Link>
              <Link href="/jobs">Jobs</Link>
              <Link href="/company">Companies</Link>

              {user?.role === "RECRUITER" && (
                <Link href="/recruiter">Manage Jobs</Link>
              )}
            </nav>

            <Separator />

            {isLoggedIn ? (
              <>
                <div>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-xs text-slate-500">
                    {user.role.toLowerCase()}
                  </p>
                </div>

                <Link href={`${basePath}/profile`}>Profile</Link>
                <Link href={`${basePath}/setting`}>Settings</Link>

                <Button onClick={handleLogout} disabled={loading}>
                  {loading ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}