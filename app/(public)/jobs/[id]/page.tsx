import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Currency, 
  Building2, 
  ArrowLeft,
  Share2,
  Bookmark,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Mock Data for a single job
const MOCK_JOB = {
  id: "1",
  title: "React.js, HTML, CSS - UI Developer",
  companyName: "PSRTEK",
  location: "Pune, Maharashtra",
  type: "Full Time",
  salary: "5-10 Lacs PA",
  postedAt: "2 days ago",
  experience: "2-5 years",
  openings: 3,
  description: `We are looking for a skilled UI Developer with a strong foundation in React.js. You will be responsible for building the visual elements of our web applications and ensuring a seamless user experience.
  
  Key Responsibilities:
  - Develop new user-facing features using React.js.
  - Build reusable components and front-end libraries for future use.
  - Translate designs and wireframes into high-quality code.
  - Optimize components for maximum performance across a vast array of web-capable devices and browsers.

  Requirements:
  - Thorough understanding of React.js and its core principles.
  - Experience with popular React.js workflows (such as Flux or Redux).
  - Familiarity with newer specifications of EcmaScript.
  - Knowledge of modern authorization mechanisms, such as JSON Web Token.`,
  skills: ["React.js", "HTML5", "CSS3", "JavaScript", "Tailwind CSS"]
};

export default async function JobDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // In a real app: const job = await getJobById(params.id);
  const job = MOCK_JOB;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Navigation Header */}
      <div className="bg-white border-b sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/jobs" 
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Jobs
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 size={16} /> Share
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Bookmark size={16} /> Save
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Main Job Info */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-xl border p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">{job.title}</h1>
                  <div className="flex items-center gap-2 text-blue-600 font-medium hover:underline cursor-pointer">
                    <Building2 size={18} /> {job.companyName}
                  </div>
                </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
                  Apply Now
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-slate-500 text-sm mb-8">
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={16} /> {job.type}</span>
                <span className="flex items-center gap-1.5"><Clock size={16} /> Posted {job.postedAt}</span>
              </div>

              <Separator className="my-8" />

              <div className="prose prose-slate max-w-none">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Job Description</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 border-none">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Job Highlights Sidebar */}
          <div className="space-y-6">
            <section className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Job Overview</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Date Posted</p>
                    <p className="text-sm font-medium text-slate-900">{job.postedAt}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Experience</p>
                    <p className="text-sm font-medium text-slate-900">{job.experience}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Job Type</p>
                    <p className="text-sm font-medium text-slate-900">{job.type}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                    <Currency size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">Salary</p>
                    <p className="text-sm font-medium text-slate-900">{job.salary}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Hiring Company Summary Card */}
            <section className=" rounded-xl p-6  shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg  flex items-center justify-center">
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="font-bold">{job.companyName}</p>
                  <p className="text-xs text-slate-400">View Company Profile</p>
                </div>
              </div>
              <Button variant="outline" className="w-full border-slate-700  bg-transparent">
                View Company
              </Button>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}