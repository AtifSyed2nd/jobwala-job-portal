import { Role } from "@prisma/client";

export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  username: string;
  role?: Role;
};

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  username: string;
  role: Role;
  image: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  companyId: string | null;
  profile?: {
    firstName: string;
    lastName: string;
    avatar: string | null;
    profileTitle: string | null;
    profileHeadline: string | null;
  } | null;
};

export type AuthResponse = {
  user: SafeUser;
  token: string;
};
