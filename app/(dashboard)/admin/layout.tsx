"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  Settings,
  Bell,
  LogOut,
  Search,
  UserRoundSearch,
  X,
  Menu,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { user, loading, refetchUser } = useAuth();

  // ✅ AUTH GUARD (no flicker)
  useEffect(() => {
    if (loading) return;

    const isAdmin =
      user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

    if (!user || !isAdmin) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // ⛔ Block render until auth resolved
  if (loading) return null;

  const isAdmin =
    user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  if (!user || !isAdmin) return null;

  // ✅ Logout (clean)
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "DELETE",
        credentials: "include",
      });

      await refetchUser(); // ✅ clears global state
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Recruiters",
      href: "/admin/recruiters",
      icon: <UserRoundSearch className="w-5 h-5" />,
    },
    {
      name: "Candidates",
      href: "/admin/candidates",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Companies",
      href: "/admin/companies",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      name: "Jobs",
      href: "/admin/jobs",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* SIDEBAR */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r
        transform transition-transform duration-300 lg:translate-x-0 lg:static
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b">
          <Link href="/" className="text-xl font-bold text-blue-900">
            jobportal<span className="text-blue-600">.app</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* NAV */}
        <nav className="mt-6 px-4 space-y-1.5">
          {navItems.map((item) => {
            // ✅ better active detection
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `}
                onClick={() => setSidebarOpen(false)} // ✅ close on mobile click
              >
                {item.icon}
                <span className="text-sm font-semibold">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-6">
          {/* Mobile menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center relative">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-xs w-64"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
              <Bell className="w-5 h-5" />
            </button>

            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold">
              {user.name?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-4">{children}</main>
      </div>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}