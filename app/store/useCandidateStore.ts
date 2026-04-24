import { create } from 'zustand';

interface CandidateState {
  profile: any;
  socials: any[];
  employments: any[];
  educations: any[];
  projects: any[];
  skills: string[];
  languages: any[];
  proSkills: any[];
  preferences: any;

  // Actions
  setInitialData: (data: any) => void;
  updateProfile: (data: any) => void;
  upsertItem: (key: 'employments' | 'educations' | 'projects' | 'languages' | 'proSkills', item: any) => void;
  removeItem: (key: string, id: string) => void;
  setSkills: (skills: string[]) => void;
  setSocials: (socials: any[]) => void;
  setPreferences: (prefs: any) => void;
}

export const useCandidateStore = create<CandidateState>((set) => ({
  profile: {},
  socials: [],
  employments: [],
  educations: [],
  projects: [],
  skills: [],
  languages: [],
  proSkills: [],
  preferences: null,

  setInitialData: (data) => set({
    profile: data.user || {},
    socials: data.socials || [],
    employments: data.employments || [],
    educations: data.educations || [],
    projects: data.projects || [],
    skills: data.skills || [],
    languages: data.languages || [],
    proSkills: data.proSkills || [],
    preferences: data.preferences || null,
  }),

  updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),

  upsertItem: (key, item) => set((state: any) => {
    const existing = state[key] as any[];
    const id = item.id || Date.now().toString(); // Generate ID if new
    const newItem = { ...item, id };
    
    const index = existing.findIndex((i: any) => i.id === id);
    if (index > -1) {
      const updated = [...existing];
      updated[index] = newItem;
      return { [key]: updated };
    }
    return { [key]: [...existing, newItem] };
  }),

  removeItem: (key, id) => set((state: any) => ({
    [key]: state[key].filter((i: any) => i.id !== id && i.platform !== id)
  })),

  setSkills: (skills) => set({ skills }),
  setSocials: (socials) => set({ socials }),
  setPreferences: (preferences) => set({ preferences }),
}));