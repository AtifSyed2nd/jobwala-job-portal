"use client";

import Link from "next/link";
import { UserNav } from "./UserNav";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/button";
import { Bell, Briefcase, Building2, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth"; // ✅ FIXED

export function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  if (pathname.startsWith("/admin")) return null;
  if (loading) return null;

  const isLoggedIn = !!user;
  const isRecruiter = user?.role === "RECRUITER";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-900 hidden sm:block">
              jobportal<span className="text-blue-600">.app</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-6 text-sm text-slate-600">
            <Link href="/jobs" className="flex items-center gap-1 hover:text-blue-600">
              <Search className="w-4 h-4" /> Jobs
            </Link>

            <Link href="/company" className="flex items-center gap-1 hover:text-blue-600">
              <Building2 className="w-4 h-4" /> Companies
            </Link>

            {isRecruiter ? (
              <Link href="/recruiter" className="text-blue-600 font-semibold">
                Manage Jobs
              </Link>
            ) : (
              <Link href="/login">Post a Job</Link>
            )}
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {/* DESKTOP */}
              <div className="hidden md:flex items-center gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Bell className="w-5 h-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>Notifications</PopoverContent>
                </Popover>

                <UserNav />
              </div>

              {/* MOBILE */}
              <MobileMenu />
            </>
          ) : (
            <>
              <Button variant="ghost" className="hidden sm:flex" asChild>
                <Link href="/login">Login</Link>
              </Button>

              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/register">Get Started</Link>
              </Button>

              <MobileMenu />
            </>
          )}
        </div>
      </div>
    </header>
  );
}