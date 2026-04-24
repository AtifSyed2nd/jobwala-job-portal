import { create } from 'zustand';

interface RecruiterState {
  profile: any;
  socials: any[];
  companyDetails: any | null;

  // Actions
  setInitialData: (data: any) => void;
  updateProfile: (data: any) => void;
  setCompanyDetails: (data: any) => void;
  upsertSocial: (social: any) => void;
  removeSocial: (platform: string) => void;
}

export const useRecruiterStore = create<RecruiterState>((set) => ({
  profile: {},
  socials: [],
  companyDetails: null,

  setInitialData: (data) => set({
    profile: data.user || {},
    socials: data.socials || [],
    companyDetails: data.companyDetails || null,
  }),

  updateProfile: (data) => set((state) => ({ 
    profile: { ...state.profile, ...data } 
  })),

  setCompanyDetails: (data) => set({ companyDetails: data }),

  upsertSocial: (data) => set((state) => {
    const filtered = state.socials.filter((s) => s.platform !== data.platform);
    return { socials: [...filtered, data] };
  }),

  removeSocial: (platform) => set((state) => ({
    socials: state.socials.filter((s) => s.platform !== platform)
  })),
}));