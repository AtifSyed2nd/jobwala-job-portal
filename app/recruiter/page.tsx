import React from 'react';
import { Users, Briefcase, Building2, UserCheck, TrendingUp, MoreVertical, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from 'next/link';

const DASHBOARD_STATS = [
  { label: "Total Jobs", value: "12", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50", link: "/recruiter/myJobs" },
  { label: "Candidates", value: "458", icon: Users, color: "text-purple-600", bg: "bg-purple-50", link: "/recruiter/candidatesList" },
  { label: "Companies", value: "1", icon: Building2, color: "text-amber-600", bg: "bg-amber-50", link: "/recruiter/company" },
  { label: "Hired", value: "24", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50", link: "/recruiter/myJobs/1/applicants" },
];

const RECENT_CANDIDATES = [
  { id: 1, name: "Arjun Mehta", role: "React Developer", status: "Interview", date: "2h ago" },
  { id: 2, name: "Sanya Iyer", role: "UI/UX Designer", status: "Applied", date: "5h ago" },
  { id: 3, name: "Rohan Varma", role: "Backend Engineer", status: "Offered", date: "1d ago" },
];

export default function RecruiterDashboard() {
  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Recruiter Dashboard</h1>
        <p className="text-slate-500 text-sm">Welcome back! Here's what's happening with your recruitment funnel.</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_STATS.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center text-[10px] text-emerald-600 font-bold uppercase tracking-tight">
                  <TrendingUp size={12} className="mr-1" /> +12% growth
                </div>
                <Link href={stat.link} className="text-xs font-semibold text-blue-600 hover:underline">View Details</Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Sections: Applications & Team */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Recent Applications</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {RECENT_CANDIDATES.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">
                        {candidate.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{candidate.name}</p>
                      <p className="text-xs text-slate-500">{candidate.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{candidate.status}</Badge>
                    <Button variant="ghost" size="icon" className="text-slate-400"><MoreVertical size={16} /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="border-none shadow-sm bg-white self-start">
          <CardHeader><CardTitle className="text-md font-bold">Support</CardTitle></CardHeader>
          <CardContent>
            <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center text-center">
              <Mail className="text-blue-500 mb-2" size={24} />
              <p className="text-xs text-slate-600 mb-3">Need help with your ATS integration?</p>
              <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-600">Support Desk</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}