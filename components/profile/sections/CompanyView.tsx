"use client";

import {
  Globe,
  MapPin,
  Users,
  Building2,
  Info,
  Link as LinkIcon,
  CheckCircle2,
  Briefcase,
  Layers,
} from "lucide-react";

export interface CompanyData {
  id?: string;
  userId?: string;
  name: string;
  location: string;
  website: string;
  description: string;
  totalEmployee: string;
  companyType: string;
  preferredIndustry: string;
  department: string; // Comma-separated string from multiSelect
}

export function CompanyView({
  data,
}: {
  data?: CompanyData | null;
}) {
  if (!data) {
    return (
      <p className="text-sm text-slate-500 italic p-4 text-center border-2 border-dashed rounded-xl">
        No company information provided yet.
      </p>
    );
  }

  const renderTags = (commaSeparatedString?: string) => {
    if (!commaSeparatedString || commaSeparatedString.trim() === "")
      return (
        <span className="text-xs text-slate-400 italic">No departments listed</span>
      );

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {commaSeparatedString.split(",").map((item, i) => (
          <span
            key={i}
            className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md text-[11px] font-bold"
          >
            {item.trim()}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Company Identity Banner */}
      <div className="p-5 rounded-xl flex items-center gap-4 border bg-gradient-to-r from-slate-50 to-white border-slate-200">
        <div className="p-3 rounded-lg bg-white shadow-sm border border-slate-100">
          <Building2 className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg text-slate-800">
            {data.name || "Unnamed Company"}
          </h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
              <MapPin className="w-3 h-3" /> {data.location || "Location not set"}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline">
              <Globe className="w-3 h-3" /> 
              <a href={data.website} target="_blank" rel="noreferrer">
                {data.website ? "Visit Website" : "No Website"}
              </a>
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-green-50 border border-green-100 rounded-full">
          <CheckCircle2 className="w-3 h-3 text-green-600" />
          <span className="text-[10px] font-bold text-green-700 uppercase">Verified Recruiter</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section - Spans 2 columns */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
              About the Company
            </span>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100 italic">
              {data.description || "No description provided."}
            </p>
          </div>

          <TagSection
            label="Active Hiring Departments"
            content={renderTags(data.department)}
          />
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-5 bg-slate-50/30 p-5 rounded-xl border border-slate-100">
          <DetailRow
            icon={<Users />}
            label="Company Size"
            value={data.totalEmployee ? `${data.totalEmployee} Employees` : "Not specified"}
          />
          <DetailRow
            icon={<Layers />}
            label="Company Type"
            value={data.companyType}
          />
          <DetailRow
            icon={<Briefcase />}
            label="Primary Industry"
            value={data.preferredIndustry}
          />
          <DetailRow
            icon={<LinkIcon />}
            label="Official Website"
            value={data.website}
            isLink
          />
        </div>
      </div>
    </div>
  );
}

// Sub-components
function TagSection({
  label,
  content,
}: {
  label: string;
  content: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
        {label}
      </span>
      {content}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  isLink = false,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  isLink?: boolean;
}) {
  return (
    <div className="flex gap-3 items-start group">
      <div className="p-2 bg-white text-slate-400 rounded-md border border-slate-100 shrink-0 shadow-sm group-hover:text-indigo-500 transition-colors">
        <div className="w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full">{icon}</div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        {isLink && value ? (
          <a 
            href={value} 
            target="_blank" 
            className="text-xs font-bold text-indigo-600 truncate block hover:underline"
          >
            {value.replace(/^https?:\/\//, '')}
          </a>
        ) : (
          <p className="text-xs font-bold text-slate-800 truncate">
            {value || "Not specified"}
          </p>
        )}
      </div>
    </div>
  );
}