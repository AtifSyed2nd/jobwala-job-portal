"use client";

import { useState } from "react";
import { SectionCard } from "./SectionCard";
import { ResumeView } from "./sections/ResumeView";
import { KeySkillsView } from "./sections/KeySkillsView";
import { LanguagesView, Language } from "./sections/LanguageView";
import { TimelineView, TimelineItem } from "./sections/TimelineView";
import { DynamicFormModal, FormField } from "./forms/DynamicFormModal";
import {
  ProfessionalSkillsView,
  ProfessionalSkill,
} from "./sections/ProfessionalSkillsView";
import { ProfileHeader } from "./ProfileHeader";
import { CandidatePreferencesView } from "./sections/CandidatePreferencesView";

// --- Form Configurations ---

// Modal 1: Identity/Headline
const PROFILE_FIELDS: FormField[] = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "title", label: "Title", type: "text", colSpan: true },
  { name: "description", label: "Description", type: "text", colSpan: true },
];

// Modal 2: Contact/Personal Grid
const PERSONAL_FIELDS: FormField[] = [
  { name: "address", label: "Address", type: "text", colSpan: true },
  { name: "location", label: "Location", type: "text" },
  { name: "contact", label: "Phone Number", type: "text" },
  { name: "dob", label: "Date of Birth", type: "date" },
  {
    name: "maritalStatus",
    label: "Marital Status",
    type: "select",
    options: ["Single", "Married", "Other"],
  },
];

const SOCIAL_FIELDS: FormField[] = [
  {
    name: "platform",
    label: "Platform",
    type: "select",
    options: ["LinkedIn", "GitHub", "Portfolio", "Website", "Twitter", "Other"],
    colSpan: true,
  },
  {
    name: "url",
    label: "Full URL",
    type: "text",
    colSpan: true,
    placeholder: "https://...",
  },
  {
    name: "username",
    label: "Display Username",
    type: "text",
    colSpan: true,
    placeholder: "e.g. john_doe",
  },
];

const EMPLOYMENT_FIELDS: FormField[] = [
  { name: "role", label: "Job Title", type: "text", colSpan: true },
  { name: "company", label: "Company", type: "text", colSpan: true },
  { name: "isCurrent", label: "I am currently working here", type: "switch" },
  { name: "joiningDate", label: "Joining Date", type: "selectMonthYear" },
  { name: "leavingDate", label: "Leaving Date", type: "selectMonthYear" },
  { name: "salary", label: "Salary (LPA)", type: "number" },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    colSpan: true,
  },
];

const PROJECT_FIELDS: FormField[] = [
  { name: "title", label: "Project Title", type: "text", colSpan: true },
  { name: "link", label: "Project Link", type: "text", colSpan: true },
  { name: "isOngoing", label: "This project is ongoing", type: "switch" },
  { name: "startDate", label: "Start Date", type: "selectMonthYear" },
  { name: "endDate", label: "End Date", type: "selectMonthYear" },
  {
    name: "description",
    label: "Project Description",
    type: "textarea",
    colSpan: true,
  },
];

const EDUCATION_FIELDS: FormField[] = [
  { name: "title", label: "Degree / Course", type: "text", colSpan: true },
  {
    name: "insituteName",
    label: "Institute Name",
    type: "text",
    colSpan: true,
  },
  {
    name: "educationType",
    label: "Education Type",
    type: "select",
    options: ["12th", "Diploma", "Graduation", "Post-Graduation"],
  },
  { name: "greads", label: "Grades / CGPA", type: "text" },
  { name: "startDate", label: "Start Date", type: "selectMonthYear" },
  { name: "endDate", label: "End Date", type: "selectMonthYear" },
];

const LANGUAGE_FIELDS: FormField[] = [
  { name: "name", label: "Language", type: "text", colSpan: true },
  { name: "canSpeak", label: "Can Speak", type: "switch" },
  { name: "canRead", label: "Can Read", type: "switch" },
  { name: "canWrite", label: "Can Write", type: "switch" },
];

const PRO_SKILL_FIELDS: FormField[] = [
  { name: "title", label: "Skill Title", type: "text", colSpan: true },
  { name: "experience", label: "Experience", type: "spendMonthYear" },
  { name: "rating", label: "Rating (0-10)", type: "number" },
  { name: "lastUsed", label: "Last Used Year", type: "selectMonthYear" },
];

const SKILL_FIELDS: FormField[] = [
  { name: "skill", label: "Skill Name", type: "text", colSpan: true },
];

const PREFERENCE_FIELDS: FormField[] = [
  { name: "openToJob", label: "Actively looking for a job?", type: "switch" },
  { name: "isFresher", label: "Are you a fresher?", type: "switch" },
  { name: "currentRole", label: "Current Role", type: "text", colSpan: true },
  { name: "experience", label: "Experience", type: "spendMonthYear" },
  { name: "currentSalary", label: "Current Salary (LPA)", type: "number" },
  { name: "expectedSalary", label: "Expected Salary (LPA)", type: "number" },
  {
    name: "noticePeriod",
    label: "Notice Period",
    type: "select", // Keeping this single-select usually makes sense
    options: ["Immediate", "15 Days", "1 Month", "2 Months", "3 Months+"],
  },
  { name: "careerStartDate", label: "Career Start Date", type: "date" },
  {
    name: "preferredRoles",
    label: "Preferred Roles (comma separated)",
    type: "text",
    colSpan: true,
    placeholder: "e.g. Front-end Developer, React Dev",
  },
  {
    name: "preferredLocations",
    label: "Preferred Locations",
    type: "text",
    placeholder: "e.g. Pune, Mumbai",
  },
  // --- UPDATED TO MULTI-SELECT ---
  {
    name: "workplaceType",
    label: "Workplace Type",
    type: "multiSelect",
    options: ["Remote", "Hybrid", "On-site"],
  },
  {
    name: "employmentType",
    label: "Employment Type",
    type: "multiSelect",
    options: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
  },
  {
    name: "preferredShiftTime",
    label: "Preferred Shift",
    type: "multiSelect",
    options: ["Day Shift", "Night Shift", "Flexible", "Rotational"],
  },
  {
    name: "companyType",
    label: "Company Type",
    type: "multiSelect",
    options: ["Startup", "MNC", "Product Based", "Service Based", "Agency"],
  },
  {
    name: "preferredIndustry",
    label: "Preferred Industry",
    type: "select",
    options: [
      "IT & Services",
      "Marketing",
      "Engineering",
      "Finance",
      "Healthcare",
      "Other",
    ],
  },

  {
    name: "department",
    label: "Department",
    type: "select",
    options: [
      "Engineering",
      "Design",
      "Marketing",
      "Sales",
      "HR",
      "Product",
      "Operations",
      "Other",
    ],
  },
];

export function ProfileDashboard({ initialData }: { initialData: any }) {
  // State Management
  const [userData, setUserData] = useState(initialData.user || {});
  const [socials, setSocials] = useState(initialData.socials || []);
  const [employments, setEmployments] = useState<any[]>(
    initialData.employments || [],
  );
  const [educations, setEducations] = useState<any[]>(
    initialData.educations || [],
  );
  const [projects, setProjects] = useState<any[]>(initialData.projects || []);
  const [skills, setSkills] = useState<string[]>(initialData.skills || []);
  const [languages, setLanguages] = useState<Language[]>(
    initialData.languages || [],
  );
  const [proSkills, setProSkills] = useState<ProfessionalSkill[]>(
    initialData.proSkills || [],
  );
  const [preferences, setPreferences] = useState<any>(
    initialData.preferences || null,
  );

  // Modal State
  const [activeModal, setActiveModal] = useState<
    | "profile"
    | "personal"
    | "social"
    | "employment"
    | "education"
    | "skill"
    | "language"
    | "proSkill"
    | "project"
    | "preference"
    | null
  >(null);

  const [activeItem, setActiveItem] = useState<any>(null);

  const openModal = (type: any, item: any = null) => {
    setActiveItem(item);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveItem(null);
  };

  // --- Handlers ---

  const handleSaveUserData = async (data: any) => {
    setUserData((prev: any) => ({ ...prev, ...data }));
    closeModal();
  };

  const handleSaveSocial = async (data: any) => {
    const filtered = socials.filter((s: any) => s.platform !== data.platform);
    setSocials([...filtered, data]);
    closeModal();
  };

  const handleDeleteSocial = (platform: string) => {
    setSocials(socials.filter((s: any) => s.platform !== platform));
  };

  const handleSaveEmployment = async (data: any) => {
    if (data.id)
      setEmployments(employments.map((e) => (e.id === data.id ? data : e)));
    else
      setEmployments([...employments, { ...data, id: Date.now().toString() }]);
    closeModal();
  };

  const handleSaveEducation = async (data: any) => {
    if (data.id)
      setEducations(educations.map((e) => (e.id === data.id ? data : e)));
    else setEducations([...educations, { ...data, id: Date.now().toString() }]);
    closeModal();
  };

  const handleSaveProject = async (data: any) => {
    if (data.id)
      setProjects(projects.map((p) => (p.id === data.id ? data : p)));
    else setProjects([...projects, { ...data, id: Date.now().toString() }]);
    closeModal();
  };

  const handleSaveSkill = async (data: any) => {
    if (data.skill && !skills.includes(data.skill))
      setSkills([...skills, data.skill]);
    closeModal();
  };

  const handleSaveLanguage = async (data: any) => {
    const formatted = { id: data.id || Date.now().toString(), ...data };
    if (data.id)
      setLanguages(languages.map((l) => (l.id === data.id ? formatted : l)));
    else setLanguages([...languages, formatted]);
    closeModal();
  };

  const handleSaveProSkill = async (data: any) => {
    const formatted = { ...data, rating: parseFloat(data.rating) || 0 };
    if (data.id)
      setProSkills(proSkills.map((s) => (s.id === data.id ? formatted : s)));
    else
      setProSkills([...proSkills, { ...formatted, id: Date.now().toString() }]);
    closeModal();
  };

  const handleSavePreferences = async (data: any) => {
    const formattedData = {
      ...data,
      currentSalary: Number(data.currentSalary),
      expectedSalary: Number(data.expectedSalary),
    };
    setPreferences(formattedData);
    closeModal();
  };

  // --- Mappers ---
  const mappedEmployment: TimelineItem[] = employments.map((emp) => ({
    id: emp.id,
    title: emp.role,
    subtitle: emp.company,
    location: emp.companyLocation,
    startDate: emp.joiningDate,
    endDate: emp.leavingDate,
    isCurrent: emp.isCurrent,
    metadata: emp.salary ? `${emp.salary} LPA` : undefined,
    tags: emp.skilledUsed
      ? emp.skilledUsed.split(",").map((s: string) => s.trim())
      : [],
    description: emp.description,
    originalData: emp,
  }));

const mappedProjects = projects.map((proj: any) => ({
  id: proj.id,
  title: proj.projectName,
  subtitle: proj.client || "Personal Project",
  // FIX: Convert {month, year} object to a string
  startDate: typeof proj.startDate === 'object' 
    ? `${proj.startDate.month} ${proj.startDate.year}` 
    : proj.startDate,
  endDate: typeof proj.endDate === 'object' 
    ? `${proj.endDate.month} ${proj.endDate.year}` 
    : proj.endDate,
  isCurrent: proj.isWorkingOnThis,
  description: proj.description,
  link: proj.projectUrl,
  tags: proj.skillsUsed ? proj.skillsUsed.split(",").map((s: string) => s.trim()) : [],
  originalData: proj, // Keep this for the onEdit handler
}));

  const mappedEducation: TimelineItem[] = educations.map((edu) => ({
    id: edu.id,
    title: edu.title,
    subtitle: edu.insituteName,
    location: edu.companyLocation,
    startDate: edu.startDate,
    endDate: edu.endDate,
    metadata: edu.greads ? `Grades: ${edu.greads}` : undefined,
    originalData: edu,
  }));

  // --- Helper to assign correct Form Config and Handler ---
  let activeFields: FormField[] = [];
  let handleActiveSave: (data: any) => void = () => {};

  switch (activeModal) {
    case "profile":
    case "personal":
      activeFields =
        activeModal === "profile" ? PROFILE_FIELDS : PERSONAL_FIELDS;
      handleActiveSave = handleSaveUserData;
      break;
    case "social":
      activeFields = SOCIAL_FIELDS;
      handleActiveSave = handleSaveSocial;
      break;
    case "employment":
      activeFields = EMPLOYMENT_FIELDS;
      handleActiveSave = handleSaveEmployment;
      break;
    case "education":
      activeFields = EDUCATION_FIELDS;
      handleActiveSave = handleSaveEducation;
      break;
    case "project":
      activeFields = PROJECT_FIELDS;
      handleActiveSave = handleSaveProject;
      break;
    case "skill":
      activeFields = SKILL_FIELDS;
      handleActiveSave = handleSaveSkill;
      break;
    case "language":
      activeFields = LANGUAGE_FIELDS;
      handleActiveSave = handleSaveLanguage;
      break;
    case "preference":
      activeFields = PREFERENCE_FIELDS;
      handleActiveSave = handleSavePreferences;
      break;
    case "proSkill":
      activeFields = PRO_SKILL_FIELDS;
      handleActiveSave = handleSaveProSkill;
      break;
  }

  return (
    <div className="flex-1 space-y-6">
      <ProfileHeader
        id="profile-header"
        profileType="candidate"
        user={{ ...userData, socials }}
        onEditProfile={() => openModal("profile", userData)}
        onEditPersonalDetails={() => openModal("personal", userData)}
        onEditSocials={() => openModal("social")}
        onDeleteSocial={handleDeleteSocial}
      />

      <SectionCard id="resume" title="Resume">
        <ResumeView
          data={initialData.resume}
          onDownload={() => console.log("Downloading...")}
          onDelete={() => console.log("Deleting...")}
        />
      </SectionCard>

      <SectionCard
        id="key-skills"
        title="Key Skills"
        actionLabel="Add Skills"
        onAction={() => openModal("skill")}
      >
        <KeySkillsView
          skills={skills}
          editable
          onRemoveSkill={(s) => setSkills(skills.filter((i) => i !== s))}
        />
      </SectionCard>

      <SectionCard
        id="languages"
        title="Languages"
        actionLabel="Add Language"
        onAction={() => openModal("language")}
      >
        <LanguagesView
          languages={languages}
          editable
          onEdit={(item) => openModal("language", item)}
          onRemoveLanguage={(id) =>
            setLanguages(languages.filter((l) => l.id !== id))
          }
        />
      </SectionCard>

      <SectionCard
        id="employment"
        title="Employment"
        actionLabel="Add employment"
        onAction={() => openModal("employment")}
      >
        <TimelineView
          items={mappedEmployment}
          onEdit={(item) => openModal("employment", item.originalData)}
          onDelete={(id) =>
            setEmployments(employments.filter((e) => e.id !== id))
          }
        />
      </SectionCard>

      <SectionCard
        id="education"
        title="Education"
        actionLabel="Add education"
        onAction={() => openModal("education")}
      >
        <TimelineView
          items={mappedEducation}
          onEdit={(item) => openModal("education", item.originalData)}
          onDelete={(id) =>
            setEducations(educations.filter((e) => e.id !== id))
          }
        />
      </SectionCard>

      <SectionCard
        id="professional-skills"
        title="Professional Skills"
        actionLabel="Add Skill"
        onAction={() => openModal("proSkill")}
      >
        <ProfessionalSkillsView
          skills={proSkills}
          onEdit={(item) => openModal("proSkill", item)}
          onDelete={(id) => setProSkills(proSkills.filter((s) => s.id !== id))}
        />
      </SectionCard>

      <SectionCard
        id="projects"
        title="Projects"
        actionLabel="Add project"
        onAction={() => openModal("project")}
      >
        <TimelineView
          items={mappedProjects}
          onEdit={(item) => openModal("project", item.originalData)}
          onDelete={(id) => setProjects(projects.filter((p) => p.id !== id))}
        />
      </SectionCard>

      <SectionCard
        id="preferences"
        title="Job Preferences"
        actionLabel={preferences ? "Edit Preferences" : "Add Preferences"}
        onAction={() => openModal("preference", preferences)}
      >
        <CandidatePreferencesView data={preferences} />
      </SectionCard>

      <DynamicFormModal
        title={
          activeItem && activeModal !== "preference"
            ? `Edit ${activeModal}`
            : `Manage ${activeModal}`
        }
        isOpen={activeModal !== null}
        onClose={closeModal}
        onSave={handleActiveSave}
        fields={activeFields}
        initialData={activeModal === "preference" ? preferences : activeItem}
      />
    </div>
  );
}
