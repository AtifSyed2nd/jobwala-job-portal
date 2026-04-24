"use client";

import { DataTable, Column } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";

interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Pending" | "Blacklisted";
  appliedDate: string;
}

const mockCandidates: Candidate[] = [
  { id: "1", name: "Atif Syed", email: "atif@example.com", role: "Fullstack Developer", status: "Active", appliedDate: "2024-03-10" },
  { id: "2", name: "John Smith", email: "john@tech.com", role: "UI Designer", status: "Pending", appliedDate: "2024-03-12" },
  { id: "3", name: "Sarah Connor", email: "sarah@future.com", role: "DevOps Engineer", status: "Blacklisted", appliedDate: "2024-01-05" },
  // ... add more for pagination testing
];

export default function AdminCandidatesPage() {
  const columns: Column<Candidate>[] = [
    { 
      header: "Candidate", 
      accessor: (item) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900">{item.name}</span>
          <span className="text-xs text-slate-500">{item.email}</span>
        </div>
      ) 
    },
    { header: "Designation", accessor: "role" },
    { 
      header: "Status", 
      accessor: (item) => (
        <Badge className={
          item.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
          item.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-100" :
          "bg-red-50 text-red-700 border-red-100"
        }>
          {item.status}
        </Badge>
      ) 
    },
    { header: "Applied On", accessor: "appliedDate" },
  ];

  return (
    <DataTable
      title="Candidates Management"
      description="View and manage all registered candidates on the platform."
      data={mockCandidates}
      columns={columns}
      searchKey="name"
      filterOptions={[
        { label: "Status", key: "status", options: ["Active", "Pending", "Blacklisted"] }
      ]}
      onEdit={(c) => console.log("Edit", c)}
      onDelete={(id) => console.log("Delete", id)}
      onView={(c) => console.log("View", c)}
    />
  );
}