"use client";

import { Badge } from "@/components/ui/badge";
import { X, Volume2, BookOpenText, PenLine, Edit2 } from "lucide-react";

export interface Language {
  id: string;
  name: string;
  canSpeak: boolean;
  canRead: boolean;
  canWrite: boolean;
}

interface LanguagesViewProps {
  languages: Language[];
  editable?: boolean;
  onEdit?: (lang: Language) => void; // Added onEdit
  onRemoveLanguage?: (id: string) => void;
}

export function LanguagesView({ languages, editable = false, onEdit, onRemoveLanguage }: LanguagesViewProps) {
  if (!languages || languages.length === 0) {
    return (
      <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
        <p className="text-sm text-slate-400">No languages added yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {languages.map((lang) => (
        <div 
          key={lang.id}
          className="group relative flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded-xl min-w-45 hover:shadow-md hover:border-blue-200 transition-all"
        >
          {/* Action Buttons (Top Right) */}
          {editable && (
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onEdit?.(lang)}
                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => onRemoveLanguage?.(lang.id)}
                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Language Identity */}
          <div className="pr-10">
            <h4 className="font-bold text-slate-800">{lang.name}</h4>
          </div>

          {/* Capability Tags */}
          <div className="flex flex-wrap gap-2">
            <CapabilityBadge 
              active={lang.canSpeak} 
              icon={<Volume2 className="w-3 h-3" />} 
              label="Speak" 
            />
            <CapabilityBadge 
              active={lang.canRead} 
              icon={<BookOpenText className="w-3 h-3" />} 
              label="Read" 
            />
            <CapabilityBadge 
              active={lang.canWrite} 
              icon={<PenLine className="w-3 h-3" />} 
              label="Write" 
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Sub-component for capability visual
function CapabilityBadge({ active, icon, label }: { active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <div 
      className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all border
        ${active 
          ? 'bg-blue-50 text-blue-600 border-blue-100' 
          : 'bg-slate-50 text-slate-300 border-slate-100 opacity-60'
        }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}