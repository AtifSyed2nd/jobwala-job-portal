"use client";

import React, { useState } from 'react';
import { 
  Users, Briefcase, Building2, UserCheck, 
  LayoutDashboard, Menu, X, LogOut, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: "Dashboard", href: "/recruiter", icon: LayoutDashboard },
  { label: "My Jobs", href: "/recruiter/myJobs", icon: Briefcase },
  { label: "Candidates", href: "/recruiter/candidatesList", icon: Users },
  { label: "Unlocked", href: "/recruiter/myJobs/applicants", icon: UserCheck },
  { label: "Company", href: "/recruiter/company", icon: Building2 },
];

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* TOP NAVBAR - Fixed at the top */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-[60]">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
            <span className="font-bold text-xl text-slate-900 tracking-tight hidden sm:block">LoCoSys</span>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300" />
      </header>

      <div className="flex flex-1 pt-16">
        {/* SIDEBAR - Positioned below Navbar */}
        <aside className={`
          fixed inset-y-0 left-0 top-16 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="h-full flex flex-col p-4">
            <nav className="flex-1 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest my-4 px-3 text-center lg:text-left">Navigation</p>
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    pathname === link.href ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <link.icon size={20} />
                    <span className="font-medium text-sm">{link.label}</span>
                  </div>
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t border-slate-100">
              <Button variant="ghost" className="w-full justify-start gap-3 text-rose-600 hover:bg-rose-50">
                <LogOut size={20} />
                <span className="font-medium text-sm">Logout</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT SLOT */}
        <main className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "lg:pl-64" : "pl-0"}
        `}>
          {children}
        </main>

        {/* MOBILE OVERLAY */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}