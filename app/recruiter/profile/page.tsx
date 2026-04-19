"use client";

import { RecruitProfileDashboard } from "@/components/profile/RecruiterProfileDashboard";

export default async function Page() {
  // Mock data tailored for a Recruiter/HR profile
  const initialData = {
    user: { 
      firstName: "John", 
      lastName: "Smith", 
      role: "recruiter", 
      title: "Senior Talent Acquisition Manager", 
      description: "Building high-performing engineering teams at LoCo Tech. Passionate about developer relations and tech recruitment.", 
      dob: "1990-05-15", 
      location: "Pune, India", 
      maritalStatus: "Single", 
      contact: "+91 9876543210", 
      email: "john.smith@locotech.com" 
    },
    // This replaces 'preferences' to match our RecruitProfileDashboard logic
    companyDetails: {
      name: "LoCo Tech Solutions",
      location: "Hinjewadi, Pune",
      website: "https://locotech.example.com",
      description: "LoCo Tech is a leading SaaS provider specializing in low-code internal tools for enterprise-level logistics and supply chain management.",
      totalEmployee: "50-249",
      companyType: "Product Based",
      preferredIndustry: "IT & Services",
      department: "Engineering, Product, Design" // Multi-select string
    },
    socials: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/johnsmith" },
      { platform: "Twitter", url: "https://twitter.com/johnrecruits" }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-6">
      <div className="max-w-6xl mx-auto space-y-6">        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 shrink-0">
            <SidebarNav />
          </div>

          {/* This component now receives recruiter-specific data */}
          <RecruitProfileDashboard initialData={initialData} />
        </div>
      </div>
    </div>
  );
}

function SidebarNav() {
  // Updated links to be relevant for a Recruiter
  const links = [
    { name: "Profile", id: "profile-header" },
    { name: "Company Info", id: "company-info" },
    { name: "Social Links", id: "social-links" },
    { name: "Settings", id: "settings" }
  ];

  return (
    <div className="sticky top-24 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b bg-slate-50/50 font-bold text-sm text-slate-700">Recruiter Menu</div>
      {links.map(link => (
        <a 
          key={link.id} 
          href={`#${link.id}`} 
          className="block px-4 py-3 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border-l-2 border-transparent hover:border-indigo-600 transition-all"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}