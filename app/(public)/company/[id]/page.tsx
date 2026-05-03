import {
  Building2,
  MapPin,
  Globe,
  Users,
  Briefcase,
  ExternalLink,
  Mail,
  ShieldCheck,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CompanyCard } from "@/components/cards/CompanyCard"; 
import Link from "next/link";
import { JobCard } from "@/components/cards/JobCard";

/**
 * UPDATED MOCK DATA
 * Added mission, culture, and impacts for a more professional profile.
 */
const MOCK_COMPANY = {
  id: "1",
  name: "PSRTEK",
  industry: "Information Technology",
  location: "Pune, Maharashtra",
  website: "www.psrtek.com",
  employees: "501-1,000",
  founded: "2012",
  mission: "To empower businesses through cutting-edge digital transformation.",
  description: `PSRTEK is a leading technology solutions provider specializing in UI/UX development, Cloud infrastructure, and enterprise-grade React applications. We bridge the gap between complex business requirements and intuitive user experiences.`,
  impacts: [
    { label: "Global Clients", value: "200+", icon: Globe },
    { label: "Projects Delivered", value: "1.2k", icon: Zap },
    { label: "Awards Won", value: "15", icon: Trophy },
  ],
  openJobs: [
    {
      id: "101",
      title: "React.js, HTML, CSS - UI Developer",
      location: "Pune",
      type: "Full Time",
      salary: "5-10 Lacs PA",
    },
    {
      id: "102",
      title: "Frontend Architect",
      location: "Pune (Hybrid)",
      type: "Full Time",
      salary: "20-30 Lacs PA",
    },
  ],
};

export default async function CompanyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const company = MOCK_COMPANY;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Building2 size={48} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">{company.name}</h1>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-slate-600 text-sm">
                <span className="flex items-center gap-1.5"><MapPin size={16} /> {company.location}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={16} /> {company.industry}</span>
                <span className="flex items-center gap-1.5 text-blue-600 font-medium"><Globe size={16} /> {company.website}</span>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <Button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700">Follow</Button>
              <Button variant="outline" className="flex-1 md:flex-none gap-2">
                Visit Website <ExternalLink size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Enhanced About Section */}
            <section className="bg-white rounded-xl border p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="text-blue-600" size={20} /> Our Mission
              </h2>
              <p className="text-lg text-slate-700 italic mb-6">"{company.mission}"</p>
              
              <h2 className="text-xl font-bold text-slate-900 mb-4">About the Company</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{company.description}</p>
            </section>

            {/* 2. Impact Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {company.impacts.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border text-center shadow-sm">
                  <div className="mx-auto w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                    <item.icon size={20} />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{item.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{item.label}</div>
                </div>
              ))}
            </section>

            {/* 3. Open Vacancies Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Open Vacancies</h2>
                <span className="text-sm text-slate-500 font-medium">{company.openJobs.length} Jobs Available</span>
              </div>

              <div className="space-y-4">
                {company.openJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    hrefType="companies" 
                    data={{
                      id: company.id,
                      name: company.name,
                      industry: company.industry,
                      location: job.location,
                      openJobsCount: company.openJobs.length,
                    }}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section className="bg-white rounded-xl border p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">Company Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-500"><Users size={16} /> Employees</div>
                  <span className="font-semibold">{company.employees}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-500"><Briefcase size={16} /> Industry</div>
                  <span className="font-semibold">{company.industry}</span>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-900">Contact Information</p>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <Mail size={16} />
                  </div>
                  careers@psrtek.com
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}