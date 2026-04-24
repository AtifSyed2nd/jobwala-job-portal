"use client";

import { create } from "zustand";

export interface SearchFilters {
  query: string;
  location: string;
  jobType: string[];
  salaryRange: { min: number; max: number };
  experience: string[];
  workplaceType: string[];
  industry: string[];
}

interface SearchState {
  filters: SearchFilters;
  searchHistory: string[];
  savedJobs: string[];
  
  // Actions
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  addToSearchHistory: (query: string) => void;
  toggleSaveJob: (jobId: string) => void;
  clearSearchHistory: () => void;
}

const defaultFilters: SearchFilters = {
  query: "",
  location: "",
  jobType: [],
  salaryRange: { min: 0, max: 100 },
  experience: [],
  workplaceType: [],
  industry: [],
};

export const useSearchStore = create<SearchState>((set) => ({
  filters: defaultFilters,
  searchHistory: [],
  savedJobs: [],

  setQuery: (query) =>
    set((state) => ({
      filters: { ...state.filters, query },
    })),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  addToSearchHistory: (query) =>
    set((state) => {
      const history = [query, ...state.searchHistory].slice(0, 10);
      return { searchHistory: history };
    }),

  toggleSaveJob: (jobId) =>
    set((state) => ({
      savedJobs: state.savedJobs.includes(jobId)
        ? state.savedJobs.filter((id) => id !== jobId)
        : [...state.savedJobs, jobId],
    })),

  clearSearchHistory: () => set({ searchHistory: [] }),
}));
