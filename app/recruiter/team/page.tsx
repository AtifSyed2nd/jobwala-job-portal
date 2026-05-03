"use client";

import React, { useState } from 'react';
import { 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  MoreVertical, 
  CheckCircle2, 
  Clock 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 1. Initial Team Data
const INITIAL_TEAM = [
  { id: 1, name: "Admin User", email: "admin@locosys.com", role: "Owner", status: "Active" },
  { id: 2, name: "Sarah Chen", email: "sarah.c@locosys.com", role: "Edit", status: "Active" },
  { id: 3, name: "Pending User", email: "recruit@gmail.com", role: "View", status: "Invited" },
];

export default function TeamPage() {
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("View");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Handle Sending Invitation
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMember = {
      id: Date.now(),
      name: "Pending Member", // Placeholder until they accept
      email: inviteEmail,
      role: inviteRole,
      status: "Invited",
    };

    setTeam([...team, newMember]);
    
    // Mocking the Email Service Payload
    console.log("Sending Email Invite:", {
      to: inviteEmail,
      subject: "You're invited to join LoCoSys Team",
      role: inviteRole,
      link: `https://locosys.com/accept-invite?token=${Math.random().toString(36).substring(7)}`
    });

    setInviteEmail("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-5xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
          <p className="text-slate-500 text-sm">Manage access and roles for your recruitment team.</p>
        </div>

        {/* 3. Invite Modal (Using shadcn/ui Dialog patterns) */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <UserPlus size={18} /> Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <form onSubmit={handleInvite}>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an email invitation to a new recruiter or hiring manager.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="name@company.com" 
                    required 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assign Role</label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="View">View (Read-only)</SelectItem>
                      <SelectItem value="Edit">Edit (Manage Jobs/Candidates)</SelectItem>
                      <SelectItem value="Owner">Owner (Full Control)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-blue-600">Send Invitation</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* 4. Team List Card */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Current Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100">
            {team.map((member) => (
              <div key={member.id} className="py-4 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-slate-100 text-slate-600">
                      {member.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Mail size={12} /> {member.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden md:block">
                    <Badge variant={member.role === "Owner" ? "default" : "secondary"} className="text-[10px]">
                      {member.role}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 w-24">
                    {member.status === "Active" ? (
                      <span className="flex items-center text-emerald-600 text-xs font-medium">
                        <CheckCircle2 size={14} className="mr-1" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-600 text-xs font-medium">
                        <Clock size={14} className="mr-1" /> Invited
                      </span>
                    )}
                  </div>

                  <Button variant="ghost" size="icon" className="text-slate-400">
                    <MoreVertical size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Guide (Educational Section) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-100 rounded-lg">
          <p className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-2">
            <ShieldCheck size={14} className="text-blue-600" /> Owner
          </p>
          <p className="text-[10px] text-slate-500">Can manage billing, delete the company account, and manage all team members.</p>
        </div>
        <div className="p-4 bg-slate-100 rounded-lg">
          <p className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-2">
            <ShieldCheck size={14} className="text-purple-600" /> Edit
          </p>
          <p className="text-[10px] text-slate-500">Can post jobs, move candidates through the funnel, and edit job details.</p>
        </div>
        <div className="p-4 bg-slate-100 rounded-lg">
          <p className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-2">
            <ShieldCheck size={14} className="text-slate-600" /> View
          </p>
          <p className="text-[10px] text-slate-500">Read-only access. Can view candidates and job posts but cannot make changes.</p>
        </div>
      </div>
    </div>
  );
}