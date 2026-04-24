"use client";

import { DataTable, Column } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

interface Recruiter {
  id: string;
  name: string;
  email: string;
  company: string;
  isVerified: boolean;
  totalJobs: number;
  joinedDate: string;
}

const mockRecruiters: Recruiter[] = [
  { id: "1", name: "Robert Fox", email: "robert@tesla.com", company: "Tesla", isVerified: true, totalJobs: 12, joinedDate: "2024-01-15" },
  { id: "2", name: "Esther Howard", email: "esther@google.com", company: "Google", isVerified: false, totalJobs: 4, joinedDate: "2024-02-10" },
  { id: "3", name: "Cody Fisher", email: "cody@meta.com", company: "Meta", isVerified: true, totalJobs: 28, joinedDate: "2023-11-20" },
];

export default function AdminRecruitersPage() {
  const columns: Column<Recruiter>[] = [
    { 
      header: "Recruiter", 
      accessor: (item) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900">{item.name}</span>
          <span className="text-xs text-slate-500">{item.email}</span>
        </div>
      ) 
    },
    { header: "Company", accessor: "company" },
    { 
      header: "Status", 
      accessor: (item) => (
        <div className="flex items-center gap-1.5">
          {item.isVerified ? (
            <Badge className="bg-blue-50 text-blue-700 border-blue-100 gap-1">
              <CheckCircle2 className="w-3 h-3" /> Verified
            </Badge>
          ) : (
            <Badge className="bg-slate-100 text-slate-600 border-slate-200 gap-1">
              <XCircle className="w-3 h-3" /> Pending
            </Badge>
          )}
        </div>
      ) 
    },
    { header: "Active Jobs", accessor: (item) => <span className="font-semibold">{item.totalJobs}</span> },
    { header: "Joined", accessor: "joinedDate" },
  ];

  return (
    <DataTable
      title="Recruiter Management"
      description="Manage recruiter accounts and their job posting permissions."
      data={mockRecruiters}
      columns={columns}
      searchKey="name"
      filterOptions={[
        { label: "Verification", key: "isVerified" as any, options: ["true", "false"] }
      ]}
    />
  );
}