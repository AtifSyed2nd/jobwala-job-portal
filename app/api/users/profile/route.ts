import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";
import { z } from "zod";

/* ============================================================
   VALIDATION
============================================================ */
const ProfileSchema = z.object({
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
  profileTitle: z.string().trim().max(100).optional(),
  profileHeadline: z.string().trim().max(160).optional(),
  description: z.string().trim().max(1000).optional(),
  avatar: z.string().url().optional().or(z.literal("")),
});

const UpdateProfileSchema = ProfileSchema.partial();

/* ============================================================
   HELPERS
============================================================ */
function getUser(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

function normalize(data: any) {
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => [k, v === "" ? null : v]),
  );
}

/* ============================================================
   GET
============================================================ */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const username = searchParams.get("username");
    const id = searchParams.get("id");

    const currentUser = getUser(req);

    /* ---------------- PUBLIC BY USERNAME ---------------- */
    if (username) {
      const user = await prisma.user.findUnique({
        where: { username },
        select: {
          username: true,
          role: true,
          profile: {
            select: {
              firstName: true,
              lastName: true,
              avatar: true,
              profileTitle: true,
              profileHeadline: true,
              description: true,
            },
          },
          skills: true,
          projects: true,
          socialLinks: true,
        },
      });

      if (!user) {
        return errorResponse({ message: "Profile not found", status: 404 });
      }

      return successResponse({ data: { user } });
    }

    /* ---------------- GET BY ID (ADMIN / SELF) ---------------- */
    if (id) {
      if (!currentUser) {
        return errorResponse({ message: "Unauthorized", status: 401 });
      }

      const isAdmin =
        currentUser.role === "ADMIN" || currentUser.role === "SUPER_ADMIN";

      if (!isAdmin && currentUser.userId !== id) {
        return errorResponse({ message: "Forbidden", status: 403 });
      }

      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
          personalDetails: true,
          resume: true,
          candidatePreferences: true,
          socialLinks: true,
        },
      });

      if (!user) {
        return errorResponse({ message: "User not found", status: 404 });
      }

      return successResponse({ data: { user } });
    }

    /* ---------------- CURRENT USER ---------------- */
    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      include: {
        profile: true,
        personalDetails: true,
        resume: true,
        candidatePreferences: true,
        socialLinks: true,
      },
    });

    return successResponse({ data: { user } });
  } catch (error) {
    console.error("[PROFILE_GET]", error);

    return errorResponse({
      message: "Failed to fetch profile",
      status: 500,
    });
  }
}

/* ============================================================
   POST (CREATE PROFILE)
============================================================ */
export async function POST(req: NextRequest) {
  try {
    const currentUser = getUser(req);

    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    const body = await req.json();

    const parsed = ProfileSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
        status: 422,
      });
    }

    // ❗ prevent duplicate profile
    const exists = await prisma.profile.findUnique({
      where: { userId: currentUser.userId },
    });

    if (exists) {
      return errorResponse({
        message: "Profile already exists",
        status: 409,
      });
    }

    const profile = await prisma.profile.create({
      data: {
        userId: currentUser.userId,
        ...(normalize(parsed.data) as z.infer<typeof ProfileSchema>),
      },
    });

    return successResponse({
      message: "Profile created successfully",
      data: { profile },
      status: 201,
    });
  } catch (error) {
    console.error("[PROFILE_POST]", error);

    return errorResponse({
      message: "Failed to create profile",
      status: 500,
    });
  }
}

/* ============================================================
   PATCH (UPDATE)
============================================================ */
export async function PATCH(req: NextRequest) {
  try {
    const currentUser = getUser(req);

    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    const body = await req.json();
    const parsed = UpdateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
        status: 422,
      });
    }

    const data = normalize(parsed.data);

    const existingUser = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      select: { name: true },
    });

    const [firstName = "User", lastName = ""] =
      existingUser?.name?.split(" ") || [];

    const profile = await prisma.profile.upsert({
      where: { userId: currentUser.userId },

      update: data,

      create: {
        userId: currentUser.userId,
        firstName: (data.firstName as string) ?? firstName,
        lastName: (data.lastName as string) ?? lastName,
        ...data,
      },
    });

    return successResponse({
      message: "Profile updated successfully",
      data: { profile },
    });
  } catch (error) {
    console.error("[PROFILE_PATCH]", error);

    return errorResponse({
      message: "Failed to update profile",
      status: 500,
    });
  }
}
/* ============================================================
   DELETE (CLEAR)
============================================================ */
export async function DELETE(req: NextRequest) {
  try {
    const currentUser = getUser(req);

    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    await prisma.profile.updateMany({
      where: { userId: currentUser.userId },
      data: {
        profileTitle: null,
        profileHeadline: null,
        description: null,
        avatar: null,
      },
    });

    return successResponse({
      message: "Profile cleared",
    });
  } catch (error) {
    console.error("[PROFILE_DELETE]", error);

    return errorResponse({
      message: "Failed to clear profile",
      status: 500,
    });
  }
}
