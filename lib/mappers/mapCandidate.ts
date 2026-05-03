// lib/mappers/mapCandidate.ts
export function mapCandidateProfile(apiData: any) {
  const user = apiData?.data?.user;

  return {
    user: {
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      title: user?.profile?.profileTitle,
      description: user?.profile?.profileHeadline,

      email: user?.email,

      contact: user?.personalDetails?.contact,
      dob: user?.personalDetails?.dob,
      maritalStatus: user?.personalDetails?.maritalStatus,

      location: [
        user?.personalDetails?.city,
        user?.personalDetails?.state,
        user?.personalDetails?.country,
      ]
        .filter(Boolean)
        .join(", "),

      address: user?.personalDetails?.address,

      socials: user?.socialLinks || [],
    },

    // keep rest empty for now (later APIs)
    preferences: {},
    skills: [],
    employments: [],
    educations: [],
    projects: [],
    languages: [],
    proSkills: [],
    resume: null,
  };
}