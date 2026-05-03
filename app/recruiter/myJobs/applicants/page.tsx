"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

/**
 * MOCK DATA for Applicants
 */
const MOCK_APPLICANTS = [
  {
    id: "1",
    name: "Arjun Mehta",
    email: "arjun.m@example.com",
    phone: "+91 98765 43210",
    appliedDate: "May 1, 2026",
    status: "Shortlisted",
    matchScore: 95,
    role: "Senior UI Developer",
  },
  {
    id: "2",
    name: "Sanya Iyer",
    email: "sanya.i@example.com",
    phone: "+91 87654 32109",
    appliedDate: "May 2, 2026",
    status: "Applied",
    matchScore: 82,
    role: "UI Developer",
  },
  {
    id: "3",
    name: "Rohan Varma",
    email: "rohan.v@example.com",
    phone: "+91 76543 21098",
    appliedDate: "April 28, 2026",
    status: "Rejected",
    matchScore: 45,
    role: "Frontend Engineer",
  }
];

export default function JobApplicantsPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleStatusChange = (name: string, status: string) => {
    toast.success(`${name} moved to ${status}`);
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header & Back Navigation */}
      <div className="space-y-4">
        <Link 
          href="/recruiter/my-jobs" 
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to My Jobs
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Applicants for "Senior UI Developer"</h1>
            <p className="text-slate-500 text-sm">Review and manage candidates for this position.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download size={18} /> Export List
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
          <span className="text-sm font-medium text-slate-500">Total Applied</span>
          <span className="text-xl font-bold text-slate-900">{MOCK_APPLICANTS.length}</span>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex justify-between items-center shadow-sm">
          <span className="text-sm font-medium text-blue-700">Highly Matched</span>
          <span className="text-xl font-bold text-blue-700">1</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
          <span className="text-sm font-medium text-slate-500">Waitlisted</span>
          <span className="text-xl font-bold text-slate-900">0</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 bg-white">
          <Filter size={18} /> Filters
        </Button>
      </div>

      {/* Candidate List */}
      <div className="space-y-4">
        {MOCK_APPLICANTS.map((candidate) => (
          <Card key={candidate.id} className="border-none shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                
                {/* Candidate Info */}
                <div className="flex items-center gap-4 lg:w-1/3">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-lg">
                      {candidate.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-slate-900">{candidate.name}</h3>
                    <p className="text-xs text-slate-500 mb-1">{candidate.role}</p>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold">
                      {candidate.status}
                    </Badge>
                  </div>
                </div>

                {/* Contact & Match Info */}
                <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-slate-600"><Mail size={14} /> {candidate.email}</div>
                    <div className="flex items-center gap-2 text-slate-600"><Phone size={14} /> {candidate.phone}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-slate-500">Applied on: <span className="text-slate-900 font-medium">{candidate.appliedDate}</span></div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Match Score:</span>
                      <span className={`font-bold ${candidate.matchScore > 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {candidate.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 lg:justify-end">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-emerald-600 hover:bg-emerald-50"
                    onClick={() => handleStatusChange(candidate.name, "Shortlisted")}
                  >
                    <CheckCircle2 size={20} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-rose-600 hover:bg-rose-50"
                    onClick={() => handleStatusChange(candidate.name, "Rejected")}
                  >
                    <XCircle size={20} />
                  </Button>
                  <Separator orientation="vertical" className="h-8 mx-2 hidden lg:block" />
                  <Button variant="outline" size="sm" className="gap-2">
                    Profile <ExternalLink size={14} />
                  </Button>
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}