// components/Layout/Navbar.tsx
import Link from "next/link";
import { UserNav } from "./UserNav";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/button";

export function Navbar() {
  // Mock User - Replace this with your Auth logic later
  const user = { name: "John Doe", image: "" }; 
  const isLoggedIn = !!user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Side: Logo & Desktop Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-blue-900 tracking-tighter">
            jobportal<span className="text-blue-600">.app</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/jobs" className="hover:text-blue-600 transition-colors">Find Jobs</Link>
            <Link href="/company" className="hover:text-blue-600 transition-colors">Companies</Link>
            <Link href="/recruiters" className="hover:text-blue-600 transition-colors">Post a Job</Link>
          </nav>
        </div>

        {/* Right Side: Auth Logic */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <UserNav user={user} />
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/auth">Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm" asChild>
                <Link href="/auth">Sign up</Link>
              </Button>
            </div>
          )}
          
          {/* Mobile Menu Trigger */}
          <MobileMenu isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </header>
  );
}