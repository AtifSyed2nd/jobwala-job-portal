"use client";

import { DataTable, Column } from "@/components/dashboard/DataTable";
import { Badge } from "@/components/ui/badge";

interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  status: "Active" | "Review Pending";
}

const mockCompanies: Company[] = [
  { id: "1", name: "Apple Inc.", industry: "Technology", location: "Cupertino, CA", status: "Active" },
  { id: "2", name: "Nike", industry: "Apparel", location: "Beaverton, OR", status: "Active" },
  { id: "3", name: "Future Corp", industry: "Robotics", location: "Tokyo, Japan", status: "Review Pending" },
];

export default function AdminCompaniesPage() {
  const columns: Column<Company>[] = [
    { header: "Company Name", accessor: "name", className: "font-bold text-slate-900" },
    { header: "Industry", accessor: "industry" },
    { header: "Headquarters", accessor: "location" },
    { 
      header: "Approval", 
      accessor: (item) => (
        <Badge className={
          item.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
        }>
          {item.status}
        </Badge>
      ) 
    },
  ];

  return (
    <DataTable
      title="Company Directory"
      description="Manage registered companies and their verification levels."
      data={mockCompanies}
      columns={columns}
      searchKey="name"
      filterOptions={[
        { label: "Industry", key: "industry", options: ["Technology", "Apparel", "Robotics"] }
      ]}
    />
  );
}