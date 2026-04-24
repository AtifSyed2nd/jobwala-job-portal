"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useRecruiterStore } from "@/app/store/useRecruiterStore";
import { SectionCard } from "./SectionCard";
import { DynamicFormModal, FormField } from "./forms/DynamicFormModal";
import { ProfileHeader } from "./ProfileHeader";
import { CompanyView } from "./sections/CompanyView";

// --- Form Configurations ---
const PROFILE_FIELDS: FormField[] = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "title", label: "Professional Title", type: "text", colSpan: true },
  { name: "description", label: "Short Bio", type: "textarea", colSpan: true },
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

const SOCIAL_FIELDS: FormField[] = [
  {
    name: "platform",
    label: "Platform",
    type: "select",
    options: ["LinkedIn", "Twitter", "GitHub", "Website"],
    colSpan: true,
  },
  {
    name: "url",
    label: "Full URL",
    type: "text",
    colSpan: true,
    placeholder: "https://...",
  },
];

const COMPANY_FIELDS: FormField[] = [
  { name: "name", label: "Company Name", type: "text", colSpan: true },
  { name: "website", label: "Website URL", type: "text" , colSpan: true},
  { name: "location", label: "Headquarters", type: "textarea" , colSpan: true},
  {
    name: "description",
    label: "Company Description",
    type: "textarea",
    colSpan: true,
  },
  {
    name: "totalEmployee",
    label: "Company Size",
    type: "select",
    options: [
      "1-15",
      "16-49",
      "50-249",
      "250-699",
      "700-1499",
      "1500-2999",
      "3000+",
    ],
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
    label: "Hiring Departments",
    type: "multiSelect",
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

export function RecruitProfileDashboard({ initialData }: { initialData: any }) {
  const store = useRecruiterStore();

  // Hydrate only once on mount
  useEffect(() => {
    if (initialData) store.setInitialData(initialData);
  }, []); // Empty dependency array to prevent loops

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<any>(null);

  const openModal = (type: string, item: any = null) => {
    setActiveItem(item);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveItem(null);
  };

  const handleSave = (data: any) => {
    if (!activeModal) return;

    switch (activeModal) {
      case "profile":
      case "personal":
        store.updateProfile(data);
        toast.success("Recruiter profile updated.");
        break;
      case "company":
        store.setCompanyDetails(data);
        toast.success("Company information saved.");
        break;
      case "social":
        store.upsertSocial(data);
        toast.success(`${data.platform} linked successfully.`);
        break;
    }
    closeModal();
  };

  const getModalConfig = () => {
    switch (activeModal) {
      case "profile":
        return { fields: PROFILE_FIELDS, title: "Edit Header" };
      case "personal":
        return { fields: PERSONAL_FIELDS, title: "Personal Details" };
      case "company":
        return { fields: COMPANY_FIELDS, title: "Company Details" };
      case "social":
        return { fields: SOCIAL_FIELDS, title: "Social Profiles" };
      default:
        return { fields: [], title: "" };
    }
  };

  const { fields, title } = getModalConfig();

  return (
    <div className="flex-1 space-y-6">
      <ProfileHeader
        id="profile-header"
        profileType="recruiter"
        user={{ ...store.profile, socials: store.socials }}
        onEditProfile={() => openModal("profile", store.profile)}
        onEditPersonalDetails={() => openModal("personal", store.profile)}
        onEditSocials={() => openModal("social")}
        onDeleteSocial={(platform) => {
          store.removeSocial(platform);
          toast.error(`${platform} removed.`);
        }}
      />

      <SectionCard
        id="company-info"
        title="Company Profile"
        actionLabel={store.companyDetails ? "Edit Company" : "Add Company"}
        onAction={() => openModal("company", store.companyDetails)}
      >
        <CompanyView data={store.companyDetails} />
      </SectionCard>

      <DynamicFormModal
        title={title}
        isOpen={activeModal !== null}
        onClose={closeModal}
        onSave={handleSave}
        fields={fields}
        initialData={
          activeModal === "company" ? store.companyDetails : activeItem
        }
      />
    </div>
  );
}
