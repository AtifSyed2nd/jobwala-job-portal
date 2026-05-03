"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  Home,
  Briefcase,
  Building2,
  Settings,
  Bell,
  LogOut,
  UserCircle,
  LogIn,
  UserPlus,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// --- STATIC MOCK DATA ---
// Toggle this to null to see the "Logged Out" view
const mockUser = {
  name: "Atif Syed",
  role: "ADMIN", // Options: "ADMIN", "RECRUITER", "CANDIDATE"
};

export function MobileMenu() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!mockUser;

  // Static path mapping based on role
  const getStaticPath = (role: string) => {
    switch (role) {
      case "ADMIN": return "/admin";
      case "RECRUITER": return "/recruiter";
      default: return "/candidate";
    }
  };

  const basePath = isLoggedIn ? getStaticPath(mockUser.role) : "";

  const handleLogout = () => {
    setLoading(true);
    // Simulate a brief delay then "logout"
    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 500);
  };

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu className="w-6 h-6 text-slate-700" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-80 p-0">
          <SheetHeader className="p-6 text-left border-b">
            <SheetTitle className="text-xl font-bold text-blue-900">
              jobportal<span className="text-blue-600">.app</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full bg-white">
            {/* PUBLIC NAVIGATION */}
            <nav className="flex flex-col gap-1 p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-2">
                Menu
              </p>
              <MenuLink href="/" icon={<Home className="w-4 h-4" />} label="Home" />
              <MenuLink href="/jobs" icon={<Briefcase className="w-4 h-4" />} label="Jobs" />
              <MenuLink href="/company" icon={<Building2 className="w-4 h-4" />} label="Companies" />
              
              {mockUser?.role === "RECRUITER" && (
                <MenuLink 
                  href="/recruiter/manage" 
                  icon={<Settings className="w-4 h-4" />} 
                  label="Manage Jobs" 
                />
              )}
            </nav>

            <div className="px-6">
              <Separator />
            </div>

            {/* AUTH SECTION */}
            <div className="flex-grow p-4">
              {isLoggedIn ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                      {mockUser.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{mockUser.name}</p>
                      <p className="text-[10px] font-medium text-slate-500 uppercase">
                        {mockUser.role}
                      </p>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-1">
                    <MenuLink 
                      href={`${basePath}/profile`} 
                      icon={<UserCircle className="w-4 h-4" />} 
                      label="My Profile" 
                    />
                    <MenuLink 
                      href={`${basePath}/settings`} 
                      icon={<Settings className="w-4 h-4" />} 
                      label="Settings" 
                    />
                    <MenuLink 
                      href="#" 
                      icon={<Bell className="w-4 h-4" />} 
                      label="Notifications" 
                    />
                  </nav>

                  <Button 
                    variant="destructive" 
                    className="w-full justify-start gap-3 h-12 rounded-xl mt-4"
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    <LogOut className="w-4 h-4" />
                    {loading ? "Signing out..." : "Logout"}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full gap-2 rounded-xl h-12">
                      <LogIn className="w-4 h-4" /> Login
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button className="w-full gap-2 rounded-xl h-12 bg-blue-600 hover:bg-blue-700">
                      <UserPlus className="w-4 h-4" /> Create Account
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Helper Component for consistent link styling
function MenuLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}