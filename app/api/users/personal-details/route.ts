import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";
import { z } from "zod";

/* ============================================================
   VALIDATION
============================================================ */

const PersonalDetailsSchema = z.object({
  address: z.string().max(255).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  pinCode: z.coerce.number().int().optional(),
  country: z.string().max(100).optional(),
  contact: z.string().max(20).optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  dob: z.coerce.date().optional(),
  currentLocation: z.string().max(100).optional(),
  maritalStatus: z.enum(["SINGLE", "MARRIED"]).optional(),
});

const UpdateSchema = PersonalDetailsSchema.partial();


function getUser(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

function normalize<T extends Record<string, any>>(data: T): T {
  const result: any = {};
  for (const key in data) {
    const value = data[key];
    result[key] = value === "" ? null : value;
  }
  return result;
}

function isCandidate(role?: string) {
  return role === "CANDIDATE";
}

function isAdmin(role?: string) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const currentUser = getUser(req);

    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    // 🔐 Admin fetch by userId
    if (id) {
      if (!isAdmin(currentUser.role) && currentUser.userId !== id) {
        return errorResponse({ message: "Forbidden", status: 403 });
      }

      const data = await prisma.personalDetails.findUnique({
        where: { userId: id },
      });

      return successResponse({ data });
    }

    // 👤 Self
    const data = await prisma.personalDetails.findUnique({
      where: { userId: currentUser.userId },
    });

    return successResponse({ data });
  } catch (error) {
    console.error("[PERSONAL_GET]", error);

    return errorResponse({
      message: "Failed to fetch personal details",
      status: 500,
    });
  }
}


export async function POST(req: NextRequest) {
  try {
    const currentUser = getUser(req);

    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    if (!isCandidate(currentUser.role)) {
      return errorResponse({ message: "Only candidates allowed", status: 403 });
    }

    const body = await req.json();
    const parsed = PersonalDetailsSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
        status: 422,
      });
    }

    // ❗ prevent duplicate
    const exists = await prisma.personalDetails.findUnique({
      where: { userId: currentUser.userId },
    });

    if (exists) {
      return errorResponse({
        message: "Personal details already exist",
        status: 409,
      });
    }

    const data = normalize(parsed.data);

    const created = await prisma.personalDetails.create({
      data: {
        userId: currentUser.userId,
        ...data,
      },
    });

    return successResponse({
      message: "Personal details created",
      data: { personalDetails: created },
      status: 201,
    });
  } catch (error) {
    console.error("[PERSONAL_POST]", error);

    return errorResponse({
      message: "Failed to create personal details",
      status: 500,
    });
  }
}


export async function PATCH(req: NextRequest) {
  try {
    const currentUser = getUser(req);

    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    if (!isCandidate(currentUser.role)) {
      return errorResponse({ message: "Only candidates allowed", status: 403 });
    }

    const body = await req.json();
    const parsed = UpdateSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
        status: 422,
      });
    }

    const data = normalize(parsed.data);

    const result = await prisma.personalDetails.upsert({
      where: { userId: currentUser.userId },

      update: data,

      create: {
        userId: currentUser.userId,
        ...data,
      },
    });

    return successResponse({
      message: "Personal details updated",
      data: { personalDetails: result },
    });
  } catch (error) {
    console.error("[PERSONAL_PATCH]", error);

    return errorResponse({
      message: "Failed to update personal details",
      status: 500,
    });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const currentUser = getUser(req);

    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    if (!isCandidate(currentUser.role)) {
      return errorResponse({ message: "Only candidates allowed", status: 403 });
    }

    await prisma.personalDetails.deleteMany({
      where: { userId: currentUser.userId },
    });

    return successResponse({
      message: "Personal details removed",
    });
  } catch (error) {
    console.error("[PERSONAL_DELETE]", error);

    return errorResponse({
      message: "Failed to delete personal details",
      status: 500,
    });
  }
}