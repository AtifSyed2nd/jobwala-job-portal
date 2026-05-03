"use client"

import { Building2, MapPin, Users, Briefcase, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    location: string;
    industry: string;
    employees: string;
    activeJobs: number;
  };
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-all border-slate-200 group bg-white">
      <CardContent className="pt-6">
        <div className="flex gap-4 items-start">
          {/* Company Logo Placeholder */}
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 text-2xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
            <Building2 size={32} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <Link href={`/companys/${company.id}`}>
                <h3 className="font-bold text-xl text-slate-900 truncate hover:text-blue-600 transition-colors">
                  {company.name}
                </h3>
              </Link>
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100 shrink-0">
                {company.activeJobs} Active Jobs
              </Badge>
            </div>

            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-slate-400" />
                {company.industry}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                {company.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-slate-400" />
                {company.employees} Employees
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-slate-50/50 py-3 flex justify-end border-t">
        <Link 
          href={`/companys/${company.id}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-2"
          )}
        >
          View Company Profile <ExternalLink size={14} />
        </Link>
      </CardFooter>
    </Card>
  );
}