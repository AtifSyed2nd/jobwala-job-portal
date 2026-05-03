"use client";

import { useState } from "react";
import { Plus, Briefcase, MapPin, Clock, DollarSign, Users, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicFormModal, FormField } from "@/components/profile/forms/DynamicFormModal";
import { toast } from "sonner";

// Configuration for the Job Creation Form
const JOB_FIELDS: FormField[] = [
  { name: "title", label: "Job Title", type: "text", colSpan: true, placeholder: "e.g. Senior UI Developer" },
  { 
    name: "type", 
    label: "Employment Type", 
    type: "select", 
    options: ["Full Time", "Part Time", "Contract", "Freelance", "Internship"] 
  },
  { name: "location", label: "Location", type: "text", placeholder: "e.g. Pune, Maharashtra (Hybrid)" },
  { name: "salary", label: "Salary Range", type: "text", placeholder: "e.g. 10-15 Lacs PA" },
  { 
    name: "experience", 
    label: "Required Experience", 
    type: "select", 
    options: ["0-1 Years", "1-3 Years", "3-5 Years", "5-10 Years", "10+ Years"] 
  },
  { name: "description", label: "Job Description", type: "textarea", colSpan: true },
];

export default function MyJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateJob = (data: any) => {
    const newJob = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      postedAt: "Just now",
      applicants: 0,
      status: "Active"
    };
    
    setJobs((prev) => [newJob, ...prev]);
    setIsModalOpen(false);
    toast.success(`Job post for ${data.title} is now live!`);
  };

  return (
    <div className="p-6 lg:p-10 bg-slate-50 min-h-screen space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Job Postings</h1>
          <p className="text-slate-500 text-sm">Manage and track your active career opportunities.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} /> Post a New Job
        </Button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <Briefcase size={48} className="text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900">No jobs posted yet</h3>
            <p className="text-slate-500 text-sm mb-6">Start hiring by creating your first job vacancy.</p>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Create Job Posting
            </Button>
          </div>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                  {/* Job Identity */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50">
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                      <span className="flex items-center gap-1.5"><DollarSign size={14} /> {job.salary}</span>
                    </div>
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-900">{job.applicants}</div>
                      <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Applicants</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit2 size={14} /> Edit
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400">
                        <MoreVertical size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dynamic Form for Job Creation */}
      <DynamicFormModal
        title="Create Job Posting"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateJob}
        fields={JOB_FIELDS}
      />
    </div>
  );
}