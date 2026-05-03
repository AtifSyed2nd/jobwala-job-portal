import { SearchBar } from "@/components/general/SearchBar";
import { JobCard } from "@/components/cards/JobCard";
import { FilterSidebar } from "@/components/general/FilterSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for the job listings
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
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Search Section */}
      <div className="bg-white border-b py-6 px-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto">
          <SearchBar type="jobs" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        <FilterSidebar type="job" />

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900">1 - 3</span>{" "}
              of {JOBS.length} jobs
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
              <JobCard
                key={jobData.id}
                hrefType="jobs"
                // ✅ FIXED: Changed 'job' to 'data' to match your JobCard component definition
                data={{
                  id: jobData.id,
                  title: jobData.title,
                  company: jobData.companyName,
                  location: jobData.location,
                  type: jobData.type,
                  salary: jobData.salary,
                }}
              />
            ))}
          </div>

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