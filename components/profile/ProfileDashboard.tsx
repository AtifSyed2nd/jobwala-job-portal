"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCandidateStore } from "@/app/store/useCandidateStore";
import {
  useUpdateProfile,
  useUpdatePersonalDetails,
} from "@/hooks/queries/useCandidateProfile";

// UI Components (Ensure these paths match your folder structure)
import { SectionCard } from "./SectionCard";
import { ResumeView } from "./sections/ResumeView";
import { KeySkillsView } from "./sections/KeySkillsView";
import { LanguagesView } from "./sections/LanguageView";
import { TimelineView, TimelineItem } from "./sections/TimelineView";
import { DynamicFormModal, FormField } from "./forms/DynamicFormModal";
import { ProfessionalSkillsView } from "./sections/ProfessionalSkillsView";
import { ProfileHeader } from "./ProfileHeader";
import { CandidatePreferencesView } from "./sections/CandidatePreferencesView";

// --- Form Configurations ---

const PROFILE_FIELDS: FormField[] = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "title", label: "Title", type: "text", colSpan: true },
  { name: "description", label: "Description", type: "textarea", colSpan: true },
];

const PERSONAL_FIELDS: FormField[] = [
  { name: "address", label: "Address", type: "text", colSpan: true },
  { name: "location", label: "Location", type: "text" },
  { name: "contact", label: "Phone Number", type: "text" },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "maritalStatus", label: "Marital Status", type: "select", options: ["Single", "Married", "Other"] },
];

const SOCIAL_FIELDS: FormField[] = [
  { name: "platform", label: "Platform", type: "select", options: ["LinkedIn", "GitHub", "Portfolio", "Website", "Twitter", "Other"], colSpan: true },
  { name: "url", label: "Full URL", type: "text", colSpan: true, placeholder: "https://..." },
  { name: "username", label: "Display Username", type: "text", colSpan: true },
];

const EMPLOYMENT_FIELDS: FormField[] = [
  { name: "role", label: "Job Title", type: "text", colSpan: true },
  { name: "company", label: "Company", type: "text", colSpan: true },
  { name: "isCurrent", label: "I am currently working here", type: "switch" },
  { name: "joiningDate", label: "Joining Date", type: "selectMonthYear" },
  { name: "leavingDate", label: "Leaving Date", type: "selectMonthYear" },
  { name: "salary", label: "Salary (LPA)", type: "number" },
  { name: "description", label: "Description", type: "textarea", colSpan: true },
];

const PROJECT_FIELDS: FormField[] = [
  { name: "title", label: "Project Title", type: "text", colSpan: true },
  { name: "link", label: "Project Link", type: "text", colSpan: true },
  { name: "isOngoing", label: "This project is ongoing", type: "switch" },
  { name: "startDate", label: "Start Date", type: "selectMonthYear" },
  { name: "endDate", label: "End Date", type: "selectMonthYear" },
  { name: "description", label: "Project Description", type: "textarea", colSpan: true },
];

const EDUCATION_FIELDS: FormField[] = [
  { name: "title", label: "Degree / Course", type: "text", colSpan: true },
  { name: "insituteName", label: "Institute Name", type: "text", colSpan: true },
  { name: "educationType", label: "Education Type", type: "select", options: ["12th", "Diploma", "Graduation", "Post-Graduation"] },
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
  { name: "currentSalary", label: "Current Salary (LPA)", type: "number" },
  { name: "expectedSalary", label: "Expected Salary (LPA)", type: "number" },
  { name: "noticePeriod", label: "Notice Period", type: "select", options: ["Immediate", "15 Days", "1 Month", "2 Months", "3 Months+"] },
  { name: "workplaceType", label: "Workplace Type", type: "multiSelect", options: ["Remote", "Hybrid", "On-site"] },
  { name: "employmentType", label: "Employment Type", type: "multiSelect", options: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"] },
];

// --- Main Component ---

export function ProfileDashboard({ initialData }: { initialData: any }) {
  const store = useCandidateStore();

  // Load initial data into Zustand on component mount
  useEffect(() => {
    if (initialData) store.setInitialData(initialData);
  }, [initialData]);

  // Modal State
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<any>(null);

  // --- Modal Handlers ---
  const openModal = (type: string, item: any = null) => {
    setActiveItem(item);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveItem(null);
  };

  // --- Centralized Save Handler ---
  const handleSave = (data: any) => {
    switch (activeModal) {
      case "profile":
      case "personal":
        store.updateProfile(data);
        toast.success("Profile basic info updated.");
        break;
      case "employment":
        store.upsertItem("employments", data);
        toast.success(data.id ? "Experience updated." : "Experience added.");
        break;
      case "education":
        store.upsertItem("educations", data);
        toast.success("Education details saved.");
        break;
      case "project":
        store.upsertItem("projects", data);
        toast.success("Project updated successfully.");
        break;
      case "language":
        store.upsertItem("languages", data);
        toast.success("Language added.");
        break;
      case "proSkill":
        store.upsertItem("proSkills", data);
        toast.success("Professional skill saved.");
        break;
      case "preference":
        store.setPreferences(data);
        toast.success("Job preferences updated.");
        break;
      case "social":
        const updatedSocials = [...store.socials.filter(s => s.platform !== data.platform), data];
        store.setSocials(updatedSocials);
        toast.success(`${data.platform} profile linked.`);
        break;
      case "skill":
        if (data.skill && !store.skills.includes(data.skill)) {
          store.setSkills([...store.skills, data.skill]);
          toast.success(`${data.skill} added to skills.`);
        }
        break;
    }
    closeModal();
  };

  // --- Data Mapping for Timeline Component ---
  const mappedEmployment: TimelineItem[] = store.employments.map((emp) => ({
    id: emp.id,
    title: emp.role,
    subtitle: emp.company,
    startDate: emp.joiningDate,
    endDate: emp.leavingDate,
    isCurrent: emp.isCurrent,
    description: emp.description,
    originalData: emp,
  }));

  const mappedEducation: TimelineItem[] = store.educations.map((edu) => ({
    id: edu.id,
    title: edu.title,
    subtitle: edu.insituteName,
    startDate: edu.startDate,
    endDate: edu.endDate,
    metadata: edu.greads ? `Grades: ${edu.greads}` : undefined,
    originalData: edu,
  }));

  const mappedProjects: TimelineItem[] = store.projects.map((proj) => ({
    id: proj.id,
    title: proj.title || proj.projectName,
    subtitle: proj.client || "Personal Project",
    startDate: proj.startDate,
    endDate: proj.endDate,
    isCurrent: proj.isOngoing || proj.isWorkingOnThis,
    description: proj.description,
    link: proj.link || proj.projectUrl,
    originalData: proj,
  }));

  // --- Dynamic Modal Configuration ---
  const getModalConfig = () => {
    switch (activeModal) {
      case "profile": return { fields: PROFILE_FIELDS, title: "Edit Header" };
      case "personal": return { fields: PERSONAL_FIELDS, title: "Personal Details" };
      case "social": return { fields: SOCIAL_FIELDS, title: "Social Profiles" };
      case "employment": return { fields: EMPLOYMENT_FIELDS, title: "Work Experience" };
      case "education": return { fields: EDUCATION_FIELDS, title: "Education" };
      case "project": return { fields: PROJECT_FIELDS, title: "Project Details" };
      case "skill": return { fields: SKILL_FIELDS, title: "Add Core Skill" };
      case "language": return { fields: LANGUAGE_FIELDS, title: "Add Language" };
      case "proSkill": return { fields: PRO_SKILL_FIELDS, title: "Add Professional Skill" };
      case "preference": return { fields: PREFERENCE_FIELDS, title: "Job Preferences" };
      default: return { fields: [], title: "" };
    }
  };

  const modalConfig = getModalConfig();

  return (
    <div className="flex-1 space-y-6 pb-20">
      
      {/* 1. Header & Identity */}
      <ProfileHeader
        id="profile-header"
        profileType="candidate"
        user={{ ...store.profile, socials: store.socials }}
        onEditProfile={() => openModal("profile", store.profile)}
        onEditPersonalDetails={() => openModal("personal", store.profile)}
        onEditSocials={() => openModal("social")}
        onDeleteSocial={(platform) => {
          store.removeItem("socials", platform);
          toast.error(`${platform} link removed.`);
        }}
      />

      {/* 2. Resume Document */}
      <SectionCard id="resume" title="Resume">
        <ResumeView 
          data={initialData.resume} 
          onDownload={() => toast.success("Downloading resume...")}
          onDelete={() => toast.error("Resume document deleted.")} 
        />
      </SectionCard>

      {/* 3. Core Keywords / Skills */}
      <SectionCard
        id="key-skills"
        title="Key Skills"
        actionLabel="Add Skills"
        onAction={() => openModal("skill")}
      >
        <KeySkillsView
          skills={store.skills}
          editable
          onRemoveSkill={(s) => {
            store.setSkills(store.skills.filter(i => i !== s));
            toast.error(`Removed ${s}`);
          }}
        />
      </SectionCard>

      {/* 4. Spoken/Written Languages */}
      <SectionCard
        id="languages"
        title="Languages"
        actionLabel="Add Language"
        onAction={() => openModal("language")}
      >
        <LanguagesView
          languages={store.languages}
          editable
          onEdit={(item) => openModal("language", item)}
          onRemoveLanguage={(id) => {
            store.removeItem("languages", id);
            toast.error("Language removed.");
          }}
        />
      </SectionCard>

      {/* 5. Work Experience Timeline */}
      <SectionCard
        id="employment"
        title="Employment History"
        actionLabel="Add Experience"
        onAction={() => openModal("employment")}
      >
        <TimelineView
          items={mappedEmployment}
          onEdit={(item) => openModal("employment", item.originalData)}
          onDelete={(id) => {
            store.removeItem("employments", id);
            toast.error("Employment record deleted.");
          }}
        />
      </SectionCard>

      {/* 6. Education Timeline */}
      <SectionCard
        id="education"
        title="Education"
        actionLabel="Add Education"
        onAction={() => openModal("education")}
      >
        <TimelineView
          items={mappedEducation}
          onEdit={(item) => openModal("education", item.originalData)}
          onDelete={(id) => {
            store.removeItem("educations", id);
            toast.error("Education record deleted.");
          }}
        />
      </SectionCard>

      {/* 7. Detailed Professional Skills */}
      <SectionCard
        id="professional-skills"
        title="Professional Skills"
        actionLabel="Add Detailed Skill"
        onAction={() => openModal("proSkill")}
      >
        <ProfessionalSkillsView
          skills={store.proSkills}
          onEdit={(item) => openModal("proSkill", item)}
          onDelete={(id) => {
            store.removeItem("proSkills", id);
            toast.error("Skill entry deleted.");
          }}
        />
      </SectionCard>

      {/* 8. Projects Portfolio */}
      <SectionCard
        id="projects"
        title="Projects"
        actionLabel="Add Project"
        onAction={() => openModal("project")}
      >
        <TimelineView
          items={mappedProjects}
          onEdit={(item) => openModal("project", item.originalData)}
          onDelete={(id) => {
            store.removeItem("projects", id);
            toast.error("Project deleted.");
          }}
        />
      </SectionCard>

      {/* 9. Candidate Job Preferences */}
      <SectionCard
        id="preferences"
        title="Job Preferences"
        actionLabel={store.preferences ? "Edit Preferences" : "Add Preferences"}
        onAction={() => openModal("preference", store.preferences)}
      >
        <CandidatePreferencesView data={store.preferences} />
      </SectionCard>

      {/* --- Global Form Modal Engine --- */}
      <DynamicFormModal
        isOpen={activeModal !== null}
        title={modalConfig.title}
        fields={modalConfig.fields}
        initialData={activeModal === "preference" ? store.preferences : activeItem}
        onClose={closeModal}
        onSave={handleSave}
      />
      
    </div>
  );
}