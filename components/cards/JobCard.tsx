// components/cards/JobCard.tsx
"use client"

import { useState } from "react"
import { toast } from "sonner"
import { MapPin, Bookmark, Briefcase, DollarSign } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface JobCardProps {
  job: {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
  };
}

export function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isApplying, setIsApplying] = useState(false)

  const handleSaveJob = () => {
    setIsSaved(!isSaved)
    if (!isSaved) {
      toast.success(`Job saved! Added to your saved jobs.`)
    } else {
      toast.info("Job removed from saved jobs.")
    }
  }

  const handleApplyJob = async () => {
    setIsApplying(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 800))
      toast.success(`Application submitted for ${job.title}!`)
    } catch (error) {
      toast.error("Failed to apply. Please try again.")
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <Card className="w-full hover:shadow-md transition-shadow border-slate-200">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center font-bold text-slate-500 text-xl">
            {/* Safe access with optional chaining */}
            {job?.company?.charAt(0) || "J"}
          </div>
          <button 
            className={`transition-colors ${isSaved ? "text-blue-600" : "text-slate-400 hover:text-slate-900"}`}
            onClick={handleSaveJob}
          >
            <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Use job.propName for all fields */}
        <h3 className="font-semibold text-lg text-slate-900 mb-1">{job.title}</h3>
        <p className="text-sm text-slate-500 mb-4">{job.company}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-slate-600">
            <Briefcase className="w-4 h-4 mr-2" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm font-medium text-slate-700">
            <DollarSign className="w-4 h-4 mr-2 text-green-600" />
            <span>{job.salary}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleApplyJob}
          disabled={isApplying}
        >
          {isApplying ? "Applying..." : "View & Apply"}
        </Button>
      </CardFooter>
    </Card>
  );
}