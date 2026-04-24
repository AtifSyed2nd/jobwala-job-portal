// lib/auth-utils.ts

export function getBasePath(role?: string) {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "SUPER_ADMIN":
      return "/admin";
    case "RECRUITER":
      return "/recruiter";
    default:
      return "/candidate";
  }
}
