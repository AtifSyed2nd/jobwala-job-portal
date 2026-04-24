import { 
  User as PrismaUser, 
  Profile as PrismaProfile, 
  PersonalDetails as PrismaPersonalDetails,
  Education as PrismaEducation,
  Employment as PrismaEmployment,
  Skill as PrismaSkill,
  Project as PrismaProject,
  SocialLink as PrismaSocialLink,
  CandidatePreference as PrismaCandidatePreference,
  Role,
  EducationType,
  NoticePeriod,
  WorkplaceType,
  EmploymentType,
  SocialPlatform
} from "@prisma/client";

// ─── 1. USER TYPES ──────────────────────────────────────────────────────────

// User without sensitive data (password)
export type UserSafe = Omit<PrismaUser, "password">;

// Full User with Relations (Useful for Dashboard/Private Profile)
export interface UserWithRelations extends UserSafe {
  profile?: PrismaProfile | null;
  personalDetails?: PrismaPersonalDetails | null;
  educations?: PrismaEducation[];
  employments?: PrismaEmployment[];
  skills?: PrismaSkill[];
  projects?: PrismaProject[];
  socialLinks?: PrismaSocialLink[];
  candidatePreferences?: PrismaCandidatePreference | null;
}

// ─── 2. COMPONENT-SPECIFIC TYPES ─────────────────────────────────────────────

export interface PublicProfile {
  username: string;
  role: Role;
  profile: {
    firstName: string;
    lastName: string;
    avatar: string | null;
    profileTitle: string | null;
    profileHeadline: string | null;
    description: string | null;
  } | null;
  skills: PrismaSkill[];
  projects: PrismaProject[];
  socialLinks: PrismaSocialLink[];
}

// ─── 3. FORM / UPDATE TYPES ──────────────────────────────────────────────────

export type ProfileUpdateInput = Partial<
  Pick<PrismaProfile, "firstName" | "lastName" | "profileTitle" | "profileHeadline" | "description" | "avatar">
>;

export type EducationInput = Omit<PrismaEducation, "id" | "userId" | "createdAt" | "updatedAt">;
export type EmploymentInput = Omit<PrismaEmployment, "id" | "userId" | "createdAt" | "updatedAt">;

// ─── 4. API RESPONSE WRAPPERS ────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>; // For Zod validation errors
  count?: number;
}

// ─── 5. RE-EXPORT ENUMS FOR FRONTEND USE ─────────────────────────────────────
// This ensures your UI components can use the same Enums as the DB
export { 
  Role, 
  EducationType, 
  NoticePeriod, 
  WorkplaceType, 
  EmploymentType, 
  SocialPlatform 
};