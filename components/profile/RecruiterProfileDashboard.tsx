"use client";

import { useState } from "react";
import { SectionCard } from "./SectionCard";
import { DynamicFormModal, FormField } from "./forms/DynamicFormModal";
import { ProfileHeader } from "./ProfileHeader";
// 1. Import the new CompanyView instead of CandidatePreferencesView
import { CompanyView } from "./sections/CompanyView";

// --- Form Configurations ---
const PROFILE_FIELDS: FormField[] = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "title", label: "Professional Title", type: "text", colSpan: true },
  { name: "description", label: "Short Bio", type: "text", colSpan: true },
];

const PERSONAL_FIELDS: FormField[] = [
  { name: "address", label: "Office Address", type: "text", colSpan: true },
  { name: "location", label: "City", type: "text" },
  { name: "contact", label: "Work Phone", type: "text" },
  { name: "dob", label: "Date of Birth", type: "date" },
  {
    name: "maritalStatus",
    label: "Marital Status",
    type: "select",
    options: ["Single", "Married", "Other"],
  },
];

const COMPANY_FIELDS: FormField[] = [
  { name: "name", label: "Company Name", type: "text", colSpan: true },
  { name: "location", label: "Headquarters", type: "text" },
  { name: "website", label: "Website URL", type: "text" },
  { name: "description", label: "Company Description", type: "textarea", colSpan: true },
  {
    name: "totalEmployee",
    label: "Company Size",
    type: "select",
    options: ["1-15", "16-49", "50-249", "250-699", "700-1499", "1500-2999", "3000+"],
  },
  {
    name: "companyType",
    label: "Company Type",
    type: "select",
    options: ["Startup", "MNC", "Product Based", "Service Based", "Agency"],
  },
  {
    name: "preferredIndustry",
    label: "Industry",
    type: "select",
    options: ["IT & Services", "Marketing", "Engineering", "Finance", "Healthcare", "Other"],
  },
  {
    name: "department",
    label: "Hiring Departments",
    type: "multiSelect", // Using your new multiSelect type
    options: ["Engineering", "Design", "Marketing", "Sales", "HR", "Product", "Operations", "Other"],
  },
];

export function RecruitProfileDashboard({ initialData }: { initialData: any }) {
  // 2. Renamed state for clarity
  const [userData, setUserData] = useState(initialData.user || {});
  const [socials, setSocials] = useState(initialData.socials || []);
  const [companyDetails, setCompanyDetails] = useState<any>(initialData.companyDetails || null);

  const [activeModal, setActiveModal] = useState<"profile" | "personal" | "company" | "social" | null>(null);
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

  const handleSaveCompany = async (data: any) => {
    // No numeric conversions needed here like in the Candidate dashboard
    setCompanyDetails(data);
    closeModal();
  };

  const handleDeleteSocial = (platform: string) => {
    setSocials(socials.filter((s: any) => s.platform !== platform));
  };

  // 3. Updated switch logic to handle "company"
  let activeFields: FormField[] = [];
  let handleActiveSave: (data: any) => void = () => {};

  switch (activeModal) {
    case "profile":
      activeFields = PROFILE_FIELDS;
      handleActiveSave = handleSaveUserData;
      break;
    case "personal":
      activeFields = PERSONAL_FIELDS;
      handleActiveSave = handleSaveUserData;
      break;
    case "company":
      activeFields = COMPANY_FIELDS;
      handleActiveSave = handleSaveCompany;
      break;
  }

  return (
    <div className="flex-1 space-y-6">
      <ProfileHeader
        id="profile-header"
        profileType="recruiter"
        user={{ ...userData, socials }}
        onEditProfile={() => openModal("profile", userData)}
        onEditPersonalDetails={() => openModal("personal", userData)}
        onEditSocials={() => openModal("social")}
        onDeleteSocial={handleDeleteSocial}
      />

      {/* 4. Use SectionCard to render the new CompanyView */}
      <SectionCard
        id="company-info"
        title="Company Profile"
        actionLabel={companyDetails ? "Edit Company" : "Add Company"}
        onAction={() => openModal("company", companyDetails)}
      >
        <CompanyView data={companyDetails} />
      </SectionCard>

      <DynamicFormModal
        title={activeModal === "company" ? "Manage Company Details" : `Edit ${activeModal}`}
        isOpen={activeModal !== null}
        onClose={closeModal}
        onSave={handleActiveSave}
        fields={activeFields}
        // Ensure companyDetails is passed as initialData when the company modal is open
        initialData={activeModal === "company" ? companyDetails : activeItem}
      />
    </div>
  );
}