"use client";

import { ProfileDashboard } from "@/components/profile/ProfileDashboard";

export default function Page() {
  // Mock data - In the future, this comes from: await getCandidateProfile()
  const initialData = {
    user: { 
      firstName: "John", 
      lastName: "Smith", 
      role: "Fullstack Developer", 
      company: "LoCo Tech", 
      title: "Senior Fullstack Developer", 
      desc: "A full-stack developer with 3+ years experience specializing in React and Node.js.", 
      dob: "2001-02-01", 
      location: "Pune, India", 
      maritalStatus: "Single", 
      contact: "9876543210", 
      email: "atif123@gmail.com" 
    },
    // --- ADDED PREFERENCES OBJECT FOR MULTI-SELECT SUPPORT ---
    preferences: {
      openToJob: true,
      isFresher: false,
      currentRole: "Fullstack Developer",
      experience: { years: 3, months: 6 },
      careerStartDate: { month: "June", year: "2021" },
      currentSalary: 8,
      expectedSalary: 12,
      noticePeriod: "1 Month",
      preferredRoles: "Fullstack Developer, Frontend Engineer, Lead Dev",
      preferredLocations: "Pune, Bangalore, Remote",
      workplaceType: "Remote, Hybrid", // Multi-select string
      employmentType: "Full-time, Contract", // Multi-select string
      preferredShiftTime: "Day Shift",
      preferredIndustry: "IT & Services, Finance",
      companyType: "Product Based, Startup",
      department: "Engineering"
    },
    resume: { name: "john_Resume.pdf", date: "Mar 05, 2025" },
    skills: ["React.js", "Next.js", "Node.js", "Tailwind CSS"],
    employments: [
      {
        id: "1",
        role: "Fullstack Web Developer",
        company: "LoCoSys",
        companyLocation: "Pune, India",
        salary: "8.0",
        joiningDate: "2024-01-01", 
        leavingDate: "Present",
        employmentType: "Full-time",
        skilledUsed: "Django Rest API, React.js, Next.js",
        noticePeriod: "15 to 30 Days",
        description: "Full-stack developer with 3+ years experience in development."
      }
    ],
    educations: [
      {
        id: "1",
        title: "B.Tech in Computer Science",
        insituteName: "Pune University",
        companyLocation: "Pune, India",
        startDate: "2018",
        endDate: "2022",
        educationType: "Graduation",
        greads: "8.5 CGPA"
      }
    ],
    itSkills: [
      { id: "1", name: "Django Rest API", version: "-", lastUsed: "2024", experience: "0.6 Yrs" }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-6">
      <div className="max-w-6xl mx-auto space-y-6">        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 shrink-0">
            <SidebarNav />
          </div>

          <ProfileDashboard initialData={initialData} />
        </div>
      </div>
    </div>
  );
}

function SidebarNav() {
  const links = [
    { name: "Profile", id: "profile-header" },
    { name: "Job Preferences", id: "preferences" }, // Added for your multi-select section
    { name: "Resume", id: "resume" },
    { name: "Key Skills", id: "key-skills" },
    { name: "Employment", id: "employment" },
    { name: "Education", id: "education" },
    { name: "IT Skills", id: "it-skills" }
  ];

  return (
    <div className="sticky top-24 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b bg-slate-50/50 font-bold text-sm text-slate-700">Quick links</div>
      {links.map(link => (
        <a 
          key={link.id} 
          href={`#${link.id}`} 
          className="block px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 border-l-2 border-transparent hover:border-blue-600 transition-all"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}