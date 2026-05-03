"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  User, 
  Settings, 
  LogOut, 
  CreditCard, 
  Bell 
} from "lucide-react";

import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

// --- STATIC MOCK DATA ---
const mockUser = {
  name: "Atif Syed",
  email: "atif@locosys.dev",
  role: "ADMIN", // Options: "ADMIN", "RECRUITER", "CANDIDATE"
  avatarUrl: "", // Add a URL here if you want to test the image
};

export function UserNav() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Helper to determine the base path based on the static role
  const getStaticBasePath = (role: string) => {
    switch (role) {
      case "ADMIN": return "/admin";
      case "RECRUITER": return "/recruiter";
      default: return "/candidate";
    }
  };

  const basePath = getStaticBasePath(mockUser.role);

  const handleLogout = () => {
    setLoading(true);
    // Simulate a brief delay to show the "Logging out..." state
    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 800);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-10 w-10 rounded-full border border-slate-200 p-0.5 transition hover:ring-4 hover:ring-blue-50 outline-none">
          <Avatar className="h-full w-full">
            <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
            <AvatarFallback className="bg-blue-600 text-white font-bold">
              {mockUser.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none text-slate-900">{mockUser.name}</p>
            <p className="text-xs leading-none text-slate-500 mt-1">
              {mockUser.email}
            </p>
            <div className="mt-2 inline-flex w-fit items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase">
              {mockUser.role}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`${basePath}/profile`} className="flex w-full items-center">
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`${basePath}/settings`} className="flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="#" className="flex w-full items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={handleLogout} 
          disabled={loading}
          className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{loading ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}