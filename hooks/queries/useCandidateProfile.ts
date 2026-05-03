"use client";

import { useState, useEffect } from "react";

// --- STATIC MOCK DATA ---
// You can edit this object to change what appears on the profile page
const MOCK_PROFILE_DATA = {
  id: "cand_01",
  name: "Atif Syed",
  email: "atif@locosys.dev",
  role: "Fullstack Developer",
  location: "Nanded, India",
  bio: "Passionate developer building modern web applications with React and Next.js.",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  experience: "2+ Years",
  phone: "+91 98765 43210",
};

/* ---------- GET PROFILE ---------- */
export function useCandidateProfile() {
  // Initialize with our hardcoded data
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchProfile = () => {
    setIsLoading(true);
    // Simulate a brief network delay
    setTimeout(() => {
      setData(MOCK_PROFILE_DATA);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchProfile,
  };
}

/* ---------- UPDATE PROFILE ---------- */
export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const mutate = async (profileData: any) => {
    setIsLoading(true);
    setError(null);

    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Static Update: Profile updated locally", profileData);
        setIsLoading(false);
        resolve({ success: true, data: profileData });
      }, 1000);
    });
  };

  return {
    mutate,
    isLoading,
    error,
  };
}

/* ---------- UPDATE PERSONAL DETAILS ---------- */
export function useUpdatePersonalDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const mutate = async (personalData: any) => {
    setIsLoading(true);
    setError(null);

    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Static Update: Personal details updated", personalData);
        setIsLoading(false);
        resolve({ success: true, data: personalData });
      }, 1000);
    });
  };

  return {
    mutate,
    isLoading,
    error,
  };
}