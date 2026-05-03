"use client";

import { useState } from "react";
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Search, 
  Eye, 
  Mail, 
  Phone, 
  Calendar,
  Layers,
  CheckCircle,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data representing a fully unlocked candidate profile
const UNLOCKED_CANDIDATES = [
  {
    id: "c1",
    name: "Amit Sharma",
    title: "Fullstack Developer",
    location: "Mumbai, MH",
    experience: "5 Years",
    email: "amit.sharma@email.com",
    phone: "+91 99000 11000",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    education: "B.Tech in Computer Science",
    lastCompany: "TechSolutions Ltd",
    preferences: "Remote, 18-22 LPA",
    address: "123, Skyline Towers, Andheri West",
    bio: "Passionate developer with a focus on scalable web architectures and clean UI."
  }
];

export default function Page() {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto bg-slate-50 min-h-screen space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Unlocked Candidates</h1>
          <p className="text-slate-500 text-sm">View full profiles of candidates you have unlocked.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search candidates..." 
            className="pl-10 bg-white" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {UNLOCKED_CANDIDATES.map((candidate) => (
          <Card key={candidate.id} className="border-none shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <User size={24} />
                </div>
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100">Full Access</Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{candidate.name}</h3>
              <p className="text-sm text-slate-500">{candidate.title}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin size={14} /> {candidate.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Briefcase size={14} /> {candidate.experience} exp
                </div>
              </div>

              <Button 
                onClick={() => setSelectedCandidate(candidate)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 gap-2"
              >
                <Eye size={16} /> View Full Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View Modal */}
      <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
        <DialogContent className="max-h-[90vh] p-0 overflow-hidden bg-white">
          <DialogHeader className="p-6 bg-slate-300 ">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <User size={24} /> Candidate Profile
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[calc(90vh-80px)] p-6">
            <div className="space-y-8 pb-8">
              
              {/* 1. Header Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900">{selectedCandidate?.name}</h2>
                  <p className="text-slate-600">{selectedCandidate?.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate?.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-700"><Mail size={16} className="text-blue-600"/> {selectedCandidate?.email}</div>
                  <div className="flex items-center gap-3 text-sm text-slate-700"><Phone size={16} className="text-blue-600"/> {selectedCandidate?.phone}</div>
                  <div className="flex items-center gap-3 text-sm text-slate-700"><MapPin size={16} className="text-blue-600"/> {selectedCandidate?.address}</div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* 2. Professional & Last Work */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4"><Briefcase size={18} className="text-blue-600"/> Experience Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Experience</p>
                      <p className="text-sm font-medium">{selectedCandidate?.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Last Organization</p>
                      <p className="text-sm font-medium">{selectedCandidate?.lastCompany}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4"><GraduationCap size={18} className="text-blue-600"/> Education</h4>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm font-semibold text-blue-900">{selectedCandidate?.education}</p>
                    <p className="text-xs text-blue-700">Completed Full-time</p>
                  </div>
                </section>
              </div>

              {/* 3. Job Preferences */}
              <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4"><Layers size={18} className="text-blue-600"/> Job Preferences</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm"><CheckCircle size={14} className="text-emerald-500" /> {selectedCandidate?.preferences.split(',')[0]}</div>
                  <div className="flex items-center gap-2 text-sm"><CheckCircle size={14} className="text-emerald-500" /> {selectedCandidate?.preferences.split(',')[1]}</div>
                  <div className="flex items-center gap-2 text-sm"><CheckCircle size={14} className="text-emerald-500" /> Immediate Joiner</div>
                </div>
              </section>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setSelectedCandidate(null)}>Close Profile</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Download CV <FileText size={16} className="ml-2"/></Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}