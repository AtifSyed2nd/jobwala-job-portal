"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Building2, Search, Bell } from "lucide-react";

// Importing the UI components from your shadcn/ui library
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Assuming these are the components we refactored in previous steps
import { UserNav } from "./UserNav";
import { MobileMenu } from "./MobileMenu";

// --- STATIC MOCK DATA ---
// Setting this locally to ensure the Navbar works independently for your demo
const mockUser = {
  name: "Atif Syed",
  role: "RECRUITER", // Toggle between "CANDIDATE", "RECRUITER", or null for logged out
};

export function Navbar() {
  const pathname = usePathname();
  
  // 1. Logic to hide navbar on admin pages
  if (pathname.startsWith("/admin")) return null;

  // 2. Static Auth logic
  const isLoggedIn = !!mockUser;
  const isRecruiter = mockUser?.role === "RECRUITER";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LEFT SECTION: Logo and Main Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 hidden sm:block tracking-tight">
              jobportal<span className="text-blue-600">.app</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink 
              href="/jobs" 
              active={pathname === "/jobs"} 
              icon={<Search className="w-4 h-4" />} 
              label="Find Jobs" 
            />
            <NavLink 
              href="/company" 
              active={pathname === "/company"} 
              icon={<Building2 className="w-4 h-4" />} 
              label="Companies" 
            />

            <div className="h-4 w-px bg-slate-200 mx-2" />

            {isRecruiter ? (
              <Link 
                href="/recruiter" 
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Manage Jobs
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                Post a Job
              </Link>
            )}
          </nav>
        </div>

        {/* RIGHT SECTION: Auth and Mobile Menu */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* Desktop Auth Controls */}
              <div className="hidden md:flex items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-blue-600">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 mt-2 p-4">
                    <h3 className="font-bold mb-2">Notifications</h3>
                    <p className="text-xs text-slate-500">You have no new notifications.</p>
                  </PopoverContent>
                </Popover>

                <UserNav />
              </div>

              {/* Mobile Menu (Always visible when mobile) */}
              <MobileMenu />
            </>
          ) : (
            <>
              <Button variant="ghost" className="hidden sm:flex text-slate-600" asChild>
                <Link href="/login">Login</Link>
              </Button>

              <Button className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100" asChild>
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

/**
 * Helper component for consistent desktop nav links
 */
function NavLink({ href, active, icon, label }: { href: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
        active ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}