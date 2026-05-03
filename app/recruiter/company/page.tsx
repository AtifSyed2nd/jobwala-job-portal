"use client";

import { useState } from "react";
import { Plus, Building2, Globe, MapPin, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicFormModal, FormField } from "@/components/profile/forms/DynamicFormModal";
import { toast } from "sonner";

// Reusing your company fields configuration
const COMPANY_FIELDS: FormField[] = [
  { name: "name", label: "Company Name", type: "text", colSpan: true },
  { name: "website", label: "Website URL", type: "text", colSpan: true },
  { name: "location", label: "Headquarters", type: "textarea", colSpan: true },
  { name: "description", label: "Company Description", type: "textarea", colSpan: true },
  {
    name: "totalEmployee",
    label: "Company Size",
    type: "select",
    options: ["1-15", "16-49", "50-249", "250-699", "700-1499", "1500-2999", "3000+"],
  },
  {
    name: "companyType",
    label: "Company Type",
    type: "select",
    options: ["Startup", "MNC", "Product Based", "Service Based", "Agency"],
  },
];

export default function Page() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateCompany = (data: any) => {
    const newCompany = {
      ...data,
      id: Math.random().toString(36).substr(2, 9), // Temporary ID generation
      createdAt: new Date().toLocaleDateString(),
    };
    
    setCompanies((prev) => [...prev, newCompany]);
    setIsModalOpen(false);
    toast.success(`${data.name} has been added to your list.`);
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto bg-slate-50 min-h-screen ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Companies</h1>
          <p className="text-slate-500 text-sm">Manage self-created and assigned company profiles.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} /> Create Company
        </Button>
      </div>

      {/* Company List Grid */}
      {companies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <Building2 size={48} className="text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No companies found</h3>
          <p className="text-slate-500 text-sm mb-6">Get started by creating your first company profile.</p>
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            Add Company Now
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Card key={company.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Building2 size={24} />
                </div>
                <Badge variant="secondary" className="text-[10px] uppercase">
                  {company.companyType}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <CardTitle className="text-lg font-bold text-slate-900">{company.name}</CardTitle>
                  <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                    <Globe size={12} /> {company.website}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin size={14} /> {company.location || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users size={14} /> {company.totalEmployee || "N/A"}
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Company Modal */}
      <DynamicFormModal
        title="Create New Company"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateCompany}
        fields={COMPANY_FIELDS}
      />
    </div>
  );
}