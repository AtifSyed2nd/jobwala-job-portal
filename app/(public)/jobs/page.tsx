// app/jobs/page.tsx
// 'use CLient'
import { SearchBar } from "@/components/general/SearchBar";
import { JobCard } from "@/components/cards/JobCard";
import { FilterSidebar } from "@/components/general/FilterSidebar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Extended mock data to match the "List" feel of the reference
const JOBS = [
  {
    id: "1",
    title: "React.js, HTML, CSS - UI Developer",
    companyName: "PSRTEK",
    location: "Pune",
    type: "Full Time",
    salary: "5-10 Lacs PA",
    status: "OPEN" as const,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "React Native developer For Pune",
    companyName: "Honeybee Tech Solutions",
    location: "Pune (Viman Nagar)",
    type: "Remote",
    salary: "1-4 Lacs PA",
    status: "OPEN" as const,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Senior Frontend Engineer",
    companyName: "TechFlow Systems",
    location: "Remote / Hybrid",
    type: "Contract",
    salary: "15-20 Lacs PA",
    status: "OPEN" as const,
    createdAt: new Date(),
  },
];

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {

  console.log(searchParams); // ✅ works on server
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Search Section - Minimal Version for Search Page */}
      <div className="bg-white border-b py-6 px-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto">
          <SearchBar
            type="jobs"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        
        {/* Left: Filters */}
        <FilterSidebar
          type="job"
        />

        {/* Right: Job Listings */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900">1 - 20</span> of 786 jobs
            </h1>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sort by:</span>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-35 h-8 text-xs">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary">Salary (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Feed */}
          <div className="grid grid-cols-1 gap-4">
            {JOBS.map((jobData) => (
              // Transform companyName to company for JobCard compatibility
              <JobCard 
                key={jobData.id} 
                job={{
                  title: jobData.title,
                  company: jobData.companyName,
                  location: jobData.location,
                  type: jobData.type,
                  salary: jobData.salary,
                }} 
              />
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="pt-8 flex justify-center">
            <button className="px-6 py-2 border rounded-full text-sm font-semibold hover:bg-white transition-colors">
              View More Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}