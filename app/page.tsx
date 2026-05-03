// app/page.tsx
import { SearchBar } from "@/components/general/SearchBar";
import { JobCard } from "@/components/cards/JobCard";

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

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-sky-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Your next career move <br className="hidden md:block" />
            <span className="text-blue-700">starts here.</span>
          </h1>

          {/* Search Bar Component */}
          <div className="pt-6">
            <SearchBar type="jobs" />
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Work on Your Own Terms
          </h2>
          <a
            href="/jobs"
            className="text-sm font-medium text-slate-600 underline hover:text-slate-900 border-b pb-1"
          >
            View all
          </a>
        </div>

        {/* CSS Grid for responsive cards */}
        {/* Job Feed */}
        <div className="grid grid-cols-3 gap-4">
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
      </section>
    </main>
  );
}
