"use client";

import { DataTable, Column } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";

interface Job {
  id: string;
  title: string;
  companyName: string;
  type: "Full-time" | "Remote" | "Contract";
  status: "Live" | "Closed" | "Draft";
  applicants: number;
}

const mockJobs: Job[] = [
  { id: "1", title: "Senior Frontend Engineer", companyName: "Airbnb", type: "Full-time", status: "Live", applicants: 45 },
  { id: "2", title: "Product Designer", companyName: "Spotify", type: "Remote", status: "Live", applicants: 120 },
  { id: "3", title: "Backend Architect", companyName: "Stripe", type: "Contract", status: "Closed", applicants: 89 },
];

export default function AdminJobsPage() {
  const columns: Column<Job>[] = [
    { 
      header: "Job Title", 
      accessor: (item) => (
        <div className="flex flex-col">
          <span className="font-bold text-slate-900">{item.title}</span>
          <span className="text-xs text-slate-500">{item.companyName}</span>
        </div>
      ) 
    },
    { 
      header: "Type", 
      accessor: (item) => (
        <Badge variant="outline" className="text-slate-600 font-medium">{item.type}</Badge>
      ) 
    },
    { 
      header: "Status", 
      accessor: (item) => (
        <Badge className={
          item.status === "Live" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-100 text-slate-600"
        }>
          {item.status}
        </Badge>
      ) 
    },
    { header: "Applicants", accessor: (item) => <span className="font-bold text-blue-600">{item.applicants}</span> },
  ];

  return (
    <DataTable
      title="Job Listings"
      description="Monitor and moderate all job postings across the platform."
      data={mockJobs}
      columns={columns}
      searchKey="title"
      filterOptions={[
        { label: "Status", key: "status", options: ["Live", "Closed", "Draft"] },
        { label: "Type", key: "type", options: ["Full-time", "Remote", "Contract"] }
      ]}
    />
  );
}