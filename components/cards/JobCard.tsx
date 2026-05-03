"use client"

import { useState } from "react"
import { toast } from "sonner"
import { MapPin, Bookmark, Briefcase, DollarSign, ExternalLink, Building2 } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface UniversalCardProps {
  data: {
    id: string;
    title?: string;     // Optional for Company
    name?: string;      // Used for Company name
    company?: string;   // Used for Job's company name
    location: string;
    type?: string;      // Optional (Job only)
    salary?: string;    // Optional (Job only)
    industry?: string;  // Optional (Company only)
  };
  // Determines the base URL path
  hrefType: "jobs" | "companys"; 
}

export function JobCard({ data, hrefType }: UniversalCardProps) {
  const [isSaved, setIsSaved] = useState(false)

  // Determine display text based on whether it's a job or company
  const displayName = data.title || data.name || "Untitled";
  const subText = data.company || data.industry || "";
  const initial = (data.company || data.name || "J").charAt(0);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSaved(!isSaved)
    toast(isSaved ? "Removed from saved." : "Saved to your profile!")
  }

  const detailHref = `/${hrefType}/${data.id}`;

  return (
    <Card className="w-full hover:shadow-md transition-all border-slate-200 group">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center font-bold text-slate-500 text-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            {hrefType === "companys" ? <Building2 size={24} /> : initial}
          </div>
          <button 
            className={`transition-colors p-2 rounded-full hover:bg-slate-50 ${isSaved ? "text-blue-600" : "text-slate-400 hover:text-slate-900"}`}
            onClick={handleSave}
          >
            <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        <Link href={detailHref}>
          <h3 className="font-semibold text-lg text-slate-900 mb-1 hover:text-blue-600 transition-colors">
            {displayName}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 mb-4">{subText}</p>

        <div className="space-y-2 mb-4">
          {/* Only show Job Type if it exists (Job mode) */}
          {data.type && (
            <div className="flex items-center text-sm text-slate-600">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{data.type}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-slate-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{data.location}</span>
          </div>

          {/* Only show Salary if it exists (Job mode) */}
          {data.salary && (
            <div className="flex items-center text-sm font-medium text-slate-700">
              <DollarSign className="w-4 h-4 mr-2 text-green-600" />
              <span>{data.salary}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Link 
          href={detailHref}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full gap-2 group-hover:bg-blue-600 group-hover:text-white transition-colors"
          )}
        >
          {hrefType === "companys" ? "View Company" : "View Details"} <ExternalLink size={14} />
        </Link>
      </CardFooter>
    </Card>
  );
}