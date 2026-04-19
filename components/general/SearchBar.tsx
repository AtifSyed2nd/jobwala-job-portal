"use client";

import { useState } from "react";
import { Search, MapPin, Briefcase, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";



type SearchType = "jobs" | "company";

type SearchState = {
  keyword: string;
  experience: string;
  location: string;
};

interface SearchBarProps {
  type?: SearchType;
  onSearch?: (data: SearchState) => void;
  defaultValues?: Partial<SearchState>;
}

export function SearchBar({
  type,
  onSearch,
  defaultValues = {},
}: SearchBarProps) {
  const [state, setState] = useState<SearchState>({
    keyword: defaultValues.keyword || "",
    experience: defaultValues.experience || "",
    location: defaultValues.location || "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };


  const handleChange = (key: keyof SearchState, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (state.keyword) params.set("keyword", state.keyword);
    if (state.location) params.set("location", state.location);
    if (state.experience) params.set("exp", state.experience);

    router.push(`/${type}?${params.toString()}`);
  };

  const handleClear = () => {
    const reset = { keyword: "", experience: "", location: "" };
    setState(reset);
    onSearch?.(reset);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl md:rounded-full shadow-lg p-2 flex flex-col md:flex-row items-center gap-2 border border-slate-100">
      
      {/* Keyword */}
      <div className="flex items-center flex-1 w-full px-4 py-2 md:border-r border-slate-200">
        <Search className="w-5 h-5 text-slate-400 mr-2" />
        <input
          type="text"
          value={state.keyword}
          onChange={(e) => handleChange("keyword", e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            type === "jobs"
              ? "Job title, skill or company"
              : "Company name, industry"
          }
          className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* Experience (only for job) */}
      {type === "jobs" && (
        <div className="flex items-center flex-1 w-full px-4 py-2 md:border-r border-slate-200">
          <Briefcase className="w-5 h-5 text-slate-400 mr-2" />
          <select
            value={state.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            className="w-full bg-transparent outline-none text-slate-700 cursor-pointer appearance-none"
          >
            <option value="">Experience</option>
            <option value="fresher">Fresher</option>
            <option value="1-3">1-3 Years</option>
            <option value="3-5">3-5 Years</option>
            <option value="5-8">5-8 Years</option>
            <option value="8-12">8-12 Years</option>
            <option value="12+">12+ Years</option>
          </select>
        </div>
      )}

      {/* Location */}
      <div className="flex items-center flex-1 w-full px-4 py-2">
        <MapPin className="w-5 h-5 text-slate-400 mr-2" />
        <input
          type="text"
          value={state.location}
          onChange={(e) => handleChange("location", e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Location"
          className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        {/* Clear */}
        {(state.keyword || state.experience || state.location) && (
          <button
            onClick={handleClear}
            className="p-2 rounded-full hover:bg-slate-100"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        )}

        {/* Search */}
        <Button
          onClick={handleSearch}
          className="w-full md:w-auto rounded-xl md:rounded-full px-6 py-5 text-sm bg-slate-900 hover:bg-slate-800 text-white"
        >
          Search
        </Button>
      </div>
    </div>
  );
}