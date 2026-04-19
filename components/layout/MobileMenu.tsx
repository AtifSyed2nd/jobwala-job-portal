// components/MobileMenu.tsx
"use client"

import Link from "next/link";
import { Menu, Home, Briefcase, Building2, PlusCircle, LogIn, UserCircle } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function MobileMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-slate-600">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-left text-blue-900 font-bold">
              jobportal.app
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col gap-6 mt-8">
            {/* Navigation Links */}
            <nav className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3 text-slate-600 font-medium">
                <Home className="w-5 h-5" /> Home
              </Link>
              <Link href="/jobs" className="flex items-center gap-3 text-slate-600 font-medium">
                <Briefcase className="w-5 h-5" /> Find Jobs
              </Link>
              <Link href="/company" className="flex items-center gap-3 text-slate-600 font-medium">
                <Building2 className="w-5 h-5" /> Companies
              </Link>
              <Link href="/recruiters" className="flex items-center gap-3 text-slate-600 font-medium">
                <PlusCircle className="w-5 h-5" /> Post a Job
              </Link>
            </nav>

            <Separator />

            {/* Auth Buttons for Mobile */}
            <div className="flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="flex items-center gap-3 text-slate-600 font-medium">
                    <UserCircle className="w-5 h-5" /> My Profile
                  </Link>
                  <Button variant="destructive" className="w-full mt-4">
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full justify-start gap-3" asChild>
                    <Link href="/auth">
                      <LogIn className="w-5 h-5" /> Login
                    </Link>
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/auth">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}