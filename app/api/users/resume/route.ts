import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";
import { z } from "zod";

/* ============================================================
   VALIDATION
============================================================ */
const ResumeSchema = z.object({
  fileName: z.string().min(2),
  fileUrl: z.string().url().optional().or(z.literal("")),
});

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
    Object.entries(data).map(([k, v]) => [k, v === "" ? null : v])
  );
}

/* ============================================================
   GET (CURRENT USER)
============================================================ */
export async function GET(req: NextRequest) {
  try {
    const currentUser = getUser(req);
    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    const resume = await prisma.resume.findUnique({
      where: { userId: currentUser.userId },
    });

    return successResponse({ data: { resume } });
  } catch (error) {
    console.error("[RESUME_GET]", error);
    return errorResponse({ message: "Failed to fetch resume", status: 500 });
  }
}

/* ============================================================
   POST / UPSERT
============================================================ */
export async function POST(req: NextRequest) {
  try {
    const currentUser = getUser(req);
    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    const body = await req.json();

    const parsed = ResumeSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
        status: 422,
      });
    }

    const data = normalize(parsed.data);

    const resume = await prisma.resume.upsert({
      where: { userId: currentUser.userId },
      update: data,
      create: {
        userId: currentUser.userId,
        fileName: (data.fileName as string) ?? "Your Resume",
        fileUrl: (data.fileUrl as string) ??  null,
      },
    });

    return successResponse({
      message: "Resume saved",
      data: { resume },
    });
  } catch (error) {
    console.error("[RESUME_POST]", error);
    return errorResponse({ message: "Failed to save resume", status: 500 });
  }
}

/* ============================================================
   DELETE
============================================================ */
export async function DELETE(req: NextRequest) {
  try {
    const currentUser = getUser(req);
    if (!currentUser) {
      return errorResponse({ message: "Unauthorized", status: 401 });
    }

    await prisma.resume.deleteMany({
      where: { userId: currentUser.userId },
    });

    return successResponse({ message: "Resume deleted" });
  } catch (error) {
    console.error("[RESUME_DELETE]", error);
    return errorResponse({ message: "Failed to delete resume", status: 500 });
  }
}