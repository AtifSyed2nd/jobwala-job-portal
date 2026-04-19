// app/page.tsx
import { SearchBar } from "@/components/general/SearchBar";
import { JobCard } from "@/components/cards/JobCard";

// Dummy data to populate our UI until we connect Prisma
const FEATURED_JOBS = [
  {
    id: 1,
    title: "AI Automations Salesperson",
    company: "Bagaian and Company",
    location: "Remote",
    type: "Hybrid",
    salary: "INR 80,000/Fixed",
  },
  {
    id: 2,
    title: "Lead Generation / Outreach Support",
    company: "Vurke Inc Private Limited",
    location: "Remote",
    type: "Contractual",
    salary: "INR 1500/Hour",
  },
  {
    id: 3,
    title: "Freelance SEO Executive",
    company: "KEXENT PAKISTAN",
    location: "Remote",
    type: "Freelance",
    salary: "INR 200/Hour",
  },
  {
    id: 4,
    title: "SEO Expert - End to End",
    company: "London School",
    location: "Remote",
    type: "Full Time",
    salary: "INR 30,000/Month",
  },
];

export default async function Home({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
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
          <h2 className="text-2xl font-bold text-slate-900">Work on Your Own Terms</h2>
          <a href="#" className="text-sm font-medium text-slate-600 underline hover:text-slate-900 border-b pb-1">
            View all
          </a>
        </div>

        {/* CSS Grid for responsive cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_JOBS.map((job) => (
           <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  );
}