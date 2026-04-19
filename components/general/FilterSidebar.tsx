"use client";

import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type FilterType = "job" | "company";

type FilterCategory = {
  id: string;
  label: string;
  type: FilterType;
  options: string[];
};

const FILTER_CATEGORIES: FilterCategory[] = [
  // JOB FILTERS
  {
    id: "work-mode",
    label: "Work mode",
    type: "job",
    options: ["Work from office", "Hybrid", "Remote"],
  },
  {
    id: "department",
    label: "Department",
    type: "job",
    options: [
      "Engineering - Software",
      "IT & Information Services",
      "UX, Design & Architecture",
      "Marketing",
    ],
  },
  
  {
    id: "salary",
    label: "Salary",
    type: "job",
    options: ["0-3 Lakhs", "3-6 Lakhs", "6-10 Lakhs", "10-15 Lakhs"],
  },

  // ✅ NEW COMPANY FILTER
  {
    id: "department",
    label: "Department",
    type: "company",
    options: [
      "Engineering - Software",
      "IT & Information Services",
      "UX, Design & Architecture",
      "Marketing",
    ],
  },
  {
    id: "company-type",
    label: "Company Type",
    type: "company",
    options: ["Startup", "MNC", "Product Based", "Service Based"],
  },
  {
    id: "company-size",
    label: "Company Size",
    type: "company",
    options: ["1-50", "50-200", "200-1000", "1000+"],
  },
];

type FilterState = {
  experience: number;
  [key: string]: string[] | number;
};

interface FilterSidebarProps {
  type: FilterType; // job | company
  onChange?: (filters: FilterState) => void;
}

export function FilterSidebar({ type, onChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    experience: 0,
  });

  // Filter categories based on type
  const categories = useMemo(
    () => FILTER_CATEGORIES.filter((c) => c.type === type),
    [type]
  );

  // Toggle checkbox
  const toggleOption = (categoryId: string, option: string) => {
    setFilters((prev) => {
      const current = (prev[categoryId] as string[]) || [];

      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];

      const newState = { ...prev, [categoryId]: updated };

      onChange?.(newState);
      return newState;
    });
  };

  // Experience change
  const handleExperience = (value: number[]) => {
    const newState = { ...filters, experience: value[0] };
    setFilters(newState);
    onChange?.(newState);
  };

  // Clear all filters
  const clearAll = () => {
    const reset = { experience: 0 };
    setFilters(reset);
    onChange?.(reset);
  };

  return (
    <div className="w-full md:w-64 space-y-6 bg-white p-4 rounded-xl border border-slate-200 h-fit sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b">
        <h3 className="font-bold text-slate-900">All Filters</h3>
        <button
          onClick={clearAll}
          className="text-xs text-blue-600 font-medium hover:underline"
        >
          Clear All
        </button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["experience", ...categories.map((c) => c.id)]}
        className="w-full"
      >
        {/* Experience */}
        {type === "job" && (
          <AccordionItem value="experience" className="border-none">
            <AccordionTrigger className="font-semibold text-sm">
              Experience ({filters.experience} yrs)
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <Slider
                value={[filters.experience]}
                max={30}
                step={1}
                onValueChange={handleExperience}
                className="mb-4"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Dynamic Filters */}
        {categories.map((cat) => {
          const selected = (filters[cat.id] as string[]) || [];

          return (
            <AccordionItem key={cat.id} value={cat.id} className="border-none">
              <AccordionTrigger className="font-semibold text-sm">
                {cat.label}
                {selected.length > 0 && (
                  <span className="ml-2 text-xs text-blue-600">
                    ({selected.length})
                  </span>
                )}
              </AccordionTrigger>

              <AccordionContent className="space-y-3 pt-1">
                {cat.options.map((option) => {
                  const checked = selected.includes(option);

                  return (
                    <div
                      key={option}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`${cat.id}-${option}`}
                        checked={checked}
                        onCheckedChange={() =>
                          toggleOption(cat.id, option)
                        }
                      />
                      <Label
                        htmlFor={`${cat.id}-${option}`}
                        className="text-sm text-slate-600 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}