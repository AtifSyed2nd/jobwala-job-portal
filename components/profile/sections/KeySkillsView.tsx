import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface KeySkillsViewProps {
  skills: string[];
  editable?: boolean;
  onRemoveSkill?: (skill: string) => void;
}

export function KeySkillsView({ skills, editable = false, onRemoveSkill }: KeySkillsViewProps) {
  if (!skills || skills.length === 0) {
    return (
      <div className="py-4 text-center border-2 border-dashed border-slate-100 rounded-xl">
        <p className="text-sm text-slate-400">No skills added yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge 
          key={skill} 
          variant="secondary" 
          className="px-4 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 border-none font-medium text-sm transition-all flex items-center gap-2"
        >
          {skill}
          {editable && (
            <button 
              onClick={() => onRemoveSkill?.(skill)}
              className="hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
}