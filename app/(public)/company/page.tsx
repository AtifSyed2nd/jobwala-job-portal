import { SearchBar } from "@/components/general/SearchBar";
import { CompanyCard } from "@/components/cards/CompanyCard"; // Updated Import
import { FilterSidebar } from "@/components/general/FilterSidebar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const COMPANYS = [
  {
    id: "1",
    name: "PSRTEK",
    location: "Pune, Maharashtra",
    industry: "IT Services",
    employees: "501-1000",
    activeJobs: 12,
  },
  {
    id: "2",
    name: "Honeybee Tech Solutions",
    location: "Pune (Viman Nagar)",
    industry: "Software Development",
    employees: "50-200",
    activeJobs: 4,
  },
  {
    id: "3",
    name: "TechFlow Systems",
    location: "Remote / Hybrid",
    industry: "Cloud Computing",
    employees: "201-500",
    activeJobs: 8,
  },
];

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b py-6 px-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto">
          <SearchBar type="company" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        <FilterSidebar type="company" />

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-900">1 - 3</span> of {COMPANYS.length} companies
            </h1>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sort by:</span>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-35 h-8 text-xs">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="size">Company Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {COMPANYS.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          <div className="pt-8 flex justify-center">
            <button className="px-6 py-2 border rounded-full text-sm font-semibold hover:bg-white transition-colors">
              View More Companies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}