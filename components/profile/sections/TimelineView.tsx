"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  Calendar,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

export interface TimelineItem {
  id: string;
  title: string; // Role, Degree, or Project Name
  subtitle: string; // Company, Institute, or Client
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean; // For Employment/Education/Projects
  description?: string;
  link?: string; // Specific to Projects
  tags?: string[]; // Skills used
  metadata?: string; // Salary, Grades, etc.
}

interface TimelineViewProps {
  items: TimelineItem[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export function TimelineView({ items, onEdit, onDelete }: TimelineViewProps) {
  if (!items || items.length === 0) {
    return (
      <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
        <p className="text-sm text-slate-400">Nothing added here yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="group relative pl-4 border-l-2 border-slate-100 hover:border-blue-500 transition-colors ml-2"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-2.25 top-1 w-4 h-4 rounded-full border-2 border-white bg-slate-200 group-hover:bg-blue-500 transition-colors" />

          <div className="pr-16">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h4 className="font-bold text-slate-900 text-base">
                {item.title}
              </h4>
              {item.isCurrent && (
                <Badge
                  variant="secondary"
                  className="bg-green-50 text-green-700 border-green-100 text-[10px] uppercase"
                >
                  Present
                </Badge>
              )}
            </div>

            <p className="text-sm font-semibold text-slate-700">
              {item.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {typeof item.startDate === "string"
                    ? item.startDate
                    : "Invalid Date"}
                  —
                  {item.isCurrent
                    ? "Present"
                    : typeof item.endDate === "string"
                      ? item.endDate
                      : "Invalid Date"}
                </span>
              </div>

              {item.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
              )}

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>View Project</span>
                </a>
              )}
            </div>

            {item.metadata && (
              <p className="text-xs font-medium text-slate-600 mt-2">
                {item.metadata}
              </p>
            )}

            {item.description && (
              <p className="text-sm text-slate-600 mt-3 leading-relaxed line-clamp-3 group-hover:line-clamp-none">
                {item.description}
              </p>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-0 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={() => onEdit(item)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onDelete(item.id)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
