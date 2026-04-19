"use client";

import {
  Briefcase,
  MapPin,
  Clock,
  Building2,
  IndianRupee,
  Calendar,
  CheckCircle2,
  XCircle,
  Rocket,
} from "lucide-react";

// Matches the structures used in your DynamicFormModal
export interface MonthYear {
  month: string;
  year: string;
}

export interface Experience {
  years: number;
  months: number;
}

export interface CandidatePreference {
  id?: string;
  userId?: string;
  openToJob: boolean;
  isFresher: boolean;
  experience: Experience; // Updated to spendMonthYear type
  currentRole: string;
  careerStartDate: MonthYear; // Updated to selectMonthYear type
  currentSalary: number;
  expectedSalary: number;
  noticePeriod: string;
  preferredRoles: string;
  preferredLocations: string;
  workplaceType: string;
  employmentType: string;
  preferredShiftTime: string;
  preferredIndustry: string;
  companyType: string;
  department: string;
}

export function CandidatePreferencesView({
  data,
}: {
  data?: CandidatePreference | null;
}) {
  if (!data) {
    return (
      <p className="text-sm text-slate-500 italic p-4">
        No job preferences set.
      </p>
    );
  }

  // Helper to format the experience object
  const formatExperience = (exp?: Experience) => {
    if (!exp) return "0 Yrs, 0 Mos";
    return `${exp.years || 0} Yrs, ${exp.months || 0} Mos`;
  };

  // Helper to format the MonthYear object
  const formatMonthYear = (date?: MonthYear) => {
    if (!date || !date.year) return "Not specified";
    return `${date.month} ${date.year}`;
  };

  const renderTags = (commaSeparatedString?: string) => {
    if (!commaSeparatedString)
      return (
        <span className="text-sm text-slate-400 italic">Not specified</span>
      );

    return (
      <div className="py-4 text-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30">
        {commaSeparatedString.split(",").map((item, i) => (
          <span
            key={i}
            className="px-2.5 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-md text-[11px] font-semibold"
          >
            {item.trim()}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Status Banner */}
      <div
        className={`p-4 rounded-xl flex items-center gap-4 border ${
          data.openToJob
            ? "bg-green-50 border-green-100 text-green-800"
            : "bg-slate-50 border-slate-200 text-slate-600"
        }`}
      >
        <div
          className={`p-2 rounded-full ${data.openToJob ? "bg-green-100" : "bg-slate-200"}`}
        >
          {data.openToJob ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-slate-400" />
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm">
            {data.openToJob
              ? "Actively Open to Opportunities"
              : "Not Currently Looking"}
          </h4>
          <p className="text-xs opacity-90 mt-0.5 font-medium">
            {data.isFresher
              ? "Fresher level candidate"
              : `Total Experience: ${formatExperience(data.experience)}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="space-y-5">
          <DetailRow
            icon={<Briefcase />}
            label="Current Role"
            value={data.currentRole}
          />
          <DetailRow
            icon={<Rocket />}
            label="Career Started"
            value={formatMonthYear(data.careerStartDate)}
          />
          <DetailRow
            icon={<Building2 />}
            label="Industry"
            value={data.preferredIndustry}
          />
          <DetailRow
            icon={<Calendar />}
            label="Notice Period"
            value={data.noticePeriod}
          />
          <DetailRow
            icon={<IndianRupee />}
            label="Salary Details"
            value={
              data.expectedSalary
                ? `₹${data.expectedSalary} LPA (Exp.)`
                : "Expected not set"
            }
            subValue={
              data.currentSalary
                ? `Current: ₹${data.currentSalary} LPA`
                : undefined
            }
          />
        </div>

        {/* Arrays / Tags */}
        <div className="space-y-2">
          <TagSection
            label="Preferred Department"
            content={renderTags(data.department)}
          />
          <TagSection
            label="Preferred Roles"
            content={renderTags(data.preferredRoles)}
          />
          <TagSection
            label="Preferred Locations"
            content={renderTags(data.preferredLocations)}
          />
          <TagSection
            label="Work Setup"
            content={renderTags(data.workplaceType)}
          />
        </div>
      </div>

      {/* Footer Info Cards */}
      <div className="pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-3 gap-4">
        <FooterItem label="Employment Type" value={data.employmentType} />
        <FooterItem label="Shift Preferences" value={data.preferredShiftTime} />
        <FooterItem label="Target Company" value={data.companyType} />
      </div>
    </div>
  );
}

// Sub-components for better organization
function TagSection({
  label,
  content,
}: {
  label: string;
  content: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
        {label}
      </span>
      {content}
    </div>
  );
}

function FooterItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-100">
      <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
        {label}
      </span>
      <span className="text-slate-700 font-semibold text-sm">
        {value || "Any"}
      </span>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  subValue?: string;
}) {
  return (
    <div className="flex gap-4 items-start group">
      <div className="p-2.5 bg-slate-50 text-slate-400 rounded-lg shrink-0 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
        <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{icon}</div>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-sm font-bold text-slate-800 mt-0.5">
          {value || "Not specified"}
        </p>
        {subValue && (
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
}
