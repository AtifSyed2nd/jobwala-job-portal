// components/Layout/UserNav.tsx
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function UserNav({ user }: { user: any }) {
  return (
    <DropdownMenu>
      {/* asChild is important to prevent button nesting issues */}
      <DropdownMenuTrigger asChild>
        <button className="relative h-10 w-10 rounded-full border border-slate-200 outline-none hover:ring-2 hover:ring-blue-100 transition-all">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-blue-600 text-white">
              {user.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      
      {/* Increase z-index here just in case */}
      <DropdownMenuContent className="w-56 z-[100]" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@jobportal.app
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
            <Link href="/profile" className="cursor-pointer">
          Profile
        </Link >
        </DropdownMenuItem >
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem >
        <DropdownMenuSeparator />
        <Link href="/auth" className="text-red-600 cursor-pointer">
          Log out
        </Link >
      </DropdownMenuContent>
    </DropdownMenu>
  );
}