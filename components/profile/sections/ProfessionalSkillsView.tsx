"use client";

import { Edit2, Trash2, Clock, CalendarDays, Award } from "lucide-react";

// 1. Updated Interface to match the new Object structures from the form
export interface ProfessionalSkill {
  id: string;
  title: string;
  experience: {
    years: number;
    months: number;
  };
  rating: number;
  lastUsed: {
    month: string;
    year: string;
  };
}

interface ProfessionalSkillsViewProps {
  skills: ProfessionalSkill[];
  onEdit?: (skill: ProfessionalSkill) => void;
  onDelete?: (id: string) => void;
}

export function ProfessionalSkillsView({
  skills,
  onEdit,
  onDelete,
}: ProfessionalSkillsViewProps) {
  
  // Helper to format experience object to string
  const formatExperience = (exp: { years: number; months: number }) => {
    if (!exp) return "No experience";
    const y = exp.years > 0 ? `${exp.years} yrs` : "";
    const m = exp.months > 0 ? `${exp.months} mos` : "";
    return `${y} ${m}`.trim() || "0 mos";
  };

  // Helper to format last used object to string
  const formatLastUsed = (last: { month: string; year: string }) => {
    if (!last || (!last.month && !last.year)) return "Not specified";
    return `${last.month} ${last.year}`;
  };

  const getRatingTheme = (rating: number) => {
    if (rating <= 2)
      return { bar: "bg-red-500", text: "text-red-500", border: "hover:border-red-200" };
    if (rating <= 4.5)
      return { bar: "bg-orange-500", text: "text-orange-500", border: "hover:border-orange-200" };
    if (rating <= 7.4)
      return { bar: "bg-yellow-500", text: "text-yellow-500", border: "hover:border-yellow-200" };
    return { bar: "bg-green-500", text: "text-green-500", border: "hover:border-green-200" };
  };

  if (!skills || skills.length === 0) {
    return (
      <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30">
        <Award className="w-8 h-8 text-slate-200 mx-auto mb-2" />
        <p className="text-sm text-slate-400">No professional skills added yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skills.map((skill) => {
        const theme = getRatingTheme(skill.rating);
        const widthPercentage = Math.min(Math.max((skill.rating / 10) * 100, 0), 100);

        return (
          <div
            key={skill.id}
            className={`group relative bg-white border border-slate-200 rounded-xl p-4 shadow-sm transition-all duration-300 ${theme.border} hover:shadow-md`}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors">
                {skill.title}
              </h4>

              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                <button
                  onClick={() => onEdit?.(skill)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete?.(skill.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-[11px] mb-1.5 uppercase tracking-wider">
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  Proficiency
                </span>
                <span className={`font-black ${theme.text}`}>
                  {skill.rating} <span className="text-slate-300">/ 10</span>
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                <div
                  className={`${theme.bar} h-2 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${widthPercentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-slate-600">
                  {formatExperience(skill.experience)}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500">
                  Last used: <span className="font-medium text-slate-600">{formatLastUsed(skill.lastUsed)}</span>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}