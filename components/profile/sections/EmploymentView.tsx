"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MapPin, Calendar, Briefcase, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Updated Interfaces ---

export interface MonthYear {
  month: string;
  year: string;
}

export interface Employment {
  id: string;
  role: string;
  company: string;
  companyLocation: string;
  salary: string;
  joiningDate: MonthYear; // Updated
  leavingDate?: MonthYear; // Updated
  isCurrent?: boolean;
  employmentType?: string;
  skilledUsed?: string; // Comma separated string
  noticePeriod?: string;
  description?: string;
}

export interface Education {
  id: string;
  title: string;
  educationType?: string;
  insituteName: string;
  companyLocation: string;
  startDate: MonthYear; // Updated
  endDate?: MonthYear;   // Updated
  isOnGiong?: boolean;
  greads?: string;
}

export interface Projects {
  id: string;
  title: string;
  link?: string;
  startDate: MonthYear; // Updated
  endDate?: MonthYear;   // Updated
  isOnGiong?: boolean;
  description?: string;
}

interface EmploymentViewProps {
  data: Employment[];
  onEdit: (item: Employment) => void;
  onDelete: (id: string) => void;
}

export function EmploymentView({ data, onEdit, onDelete }: EmploymentViewProps) {
  
  // Helper to format the MonthYear object
  const formatDate = (date?: MonthYear, isCurrent?: boolean) => {
    if (isCurrent) return "Present";
    if (!date || !date.year) return "Not specified";
    return `${date.month} ${date.year}`;
  };

  if (!data || data.length === 0) {
    return (
      <div className="py-6 text-center bg-slate-50 border border-dashed rounded-xl">
        <p className="text-sm text-slate-500 italic">No employment history added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {data.map((emp, index) => (
        <div key={emp.id} className="group relative pr-12">
          {/* Role and Company */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <div>
              <h4 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                {emp.role}
              </h4>
              <div className="flex items-center gap-2 text-slate-700 font-medium mt-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>{emp.company}</span>
                {emp.employmentType && (
                  <Badge variant="secondary" className="text-[10px] uppercase h-5 bg-blue-50 text-blue-700 border-blue-100">
                    {emp.employmentType}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Salary and Notice Info */}
            <div className="flex flex-col md:items-end text-sm">
              <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <Wallet className="w-3.5 h-3.5" />
                <span>₹{emp.salary} LPA</span>
              </div>
              <span className="text-xs text-slate-400">Notice: {emp.noticePeriod}</span>
            </div>
          </div>

          {/* Location and Timeline */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {emp.companyLocation}
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300 hidden md:block" />
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(emp.joiningDate)}</span>
              <span className="mx-1">—</span>
              <span className={emp.isCurrent ? "text-green-600 font-bold" : ""}>
                {formatDate(emp.leavingDate, emp.isCurrent)}
              </span>
            </div>
          </div>

          {/* Description */}
          {emp.description && (
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-100">
              {emp.description}
            </p>
          )}

          {/* Skills Tags */}
          {emp.skilledUsed && (
            <div className="flex flex-wrap gap-2 mt-3">
              {emp.skilledUsed.split(",").map((skill, i) => (
                <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 rounded text-[11px] font-medium shadow-sm">
                  {skill.trim()}
                </span>
              ))}
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="absolute top-0 right-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <Button 
              onClick={() => onEdit(emp)} 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => onDelete(emp.id)} 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          {index < data.length - 1 && <Separator className="mt-8" />}
        </div>
      ))}
    </div>
  );
}