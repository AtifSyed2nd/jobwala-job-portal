import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, getUserFromRequest } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";
import { registerSchema } from "@/lib/validations/user";
import { Role } from "@prisma/client";
import { ZodError } from "zod";

// ============================================================
// SELECT FIELDS (NEVER expose password)
// ============================================================
const userSelectFields = {
  id: true,
  name: true,
  email: true,
  username: true,
  role: true,
  image: true,
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
  companyId: true,
  profile: {
    select: {
      firstName: true,
      lastName: true,
      avatar: true,
      profileTitle: true,
      profileHeadline: true,
    },
  },
} as const;

// ============================================================
// POST /api/users — Register (PUBLIC)
// ============================================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ✅ Zod validation
    const parsed = registerSchema.parse(body);
    const { name, email, password, username, role } = parsed;

    // ✅ Normalize email & username (important)
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.trim();

    // ✅ Check duplicates
    const [emailExists, usernameExists] = await Promise.all([
      prisma.user.findUnique({ where: { email: normalizedEmail } }),
      prisma.user.findUnique({ where: { username: normalizedUsername } }),
    ]);

    if (emailExists) {
      return errorResponse({
        message: "Email already registered",
        status: 409,
      });
    }

    if (usernameExists) {
      return errorResponse({
        message: "Username already taken",
        status: 409,
      });
    }

    // ✅ ROLE CONTROL (NEVER trust client)
    const userRole: Role =
      role === Role.RECRUITER ? Role.RECRUITER : Role.CANDIDATE;

    // ✅ Hash password
    const hashedPassword = await hashPassword(password);

    // ✅ Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        username: normalizedUsername,
        password: hashedPassword,
        role: userRole,
        emailVerified: false,
      },
      select: userSelectFields,
    });

    return successResponse({
      message: "Account created successfully",
      data: { user },
      status: 201,
    });
  } catch (error) {
    // ✅ Zod errors
    if (error instanceof ZodError) {
      return errorResponse({
        message: "Validation failed",
        errors: error.flatten().fieldErrors,
        status: 422,
      });
    }

    console.error("[REGISTER ERROR]", error);

    return errorResponse({
      message: "Something went wrong while creating account",
      status: 500,
    });
  }
}

// ============================================================
// GET /api/users — Get current user OR admin fetch
// ============================================================
export async function GET(request: NextRequest) {
  try {
    // ✅ Auth
    const currentUser = getUserFromRequest(request);

    if (!currentUser) {
      return errorResponse({
        message: "Unauthorized",
        status: 401,
      });
    }

    const { searchParams } = new URL(request.url);
    const targetId = searchParams.get("id");

    // ========================================================
    // ✅ ADMIN: fetch other users
    // ========================================================
    if (targetId && targetId !== currentUser.userId) {
      const isAdmin =
        currentUser.role === Role.ADMIN ||
        currentUser.role === Role.SUPER_ADMIN;

      if (!isAdmin) {
        return errorResponse({
          message: "Forbidden: insufficient permissions",
          status: 403,
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: targetId },
        select: userSelectFields,
      });

      if (!user) {
        return errorResponse({
          message: "User not found",
          status: 404,
        });
      }

      return successResponse({
        message: "User fetched successfully",
        data: { user },
      });
    }

    // ========================================================
    // ✅ SELF PROFILE
    // ========================================================
    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      select: userSelectFields,
    });

    if (!user) {
      return errorResponse({
        message: "User not found",
        status: 404,
      });
    }

    return successResponse({
      message: "User fetched successfully",
      data: { user },
    });
  } catch (error) {
    console.error("[GET USERS ERROR]", error);

    return errorResponse({
      message: "Something went wrong",
      status: 500,
    });
  }
}