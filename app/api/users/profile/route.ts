import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { z } from "zod";

// Validation for Profile Updates
const UpdateProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileTitle: z.string().optional(),
  profileHeadline: z.string().optional(),
  description: z.string().optional(),
  avatar: z.string().url("Invalid avatar URL").optional().or(z.literal("")),
});

// Helper: Get User ID from Cookie
const getUserIdFromToken = (req: NextRequest) => {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
};

// ─── GET: Fetch Profile (Public or Private) ──────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username"); // Public lookup
    const currentUserId = getUserIdFromToken(req); // Private lookup

    // Scenario A: Public Profile Lookup (via ?username=johndoe)
    if (username) {
      const publicUser = await prisma.user.findUnique({
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
          // Include public professional data
          skills: true,
          projects: true,
          socialLinks: true,
        },
      });

      if (!publicUser) {
        return NextResponse.json({ success: false, message: "Profile not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: publicUser });
    }

    // Scenario B: Private Profile Lookup (User viewing their own settings)
    if (!currentUserId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const fullProfile = await prisma.user.findUnique({
      where: { id: currentUserId },
      include: {
        profile: true,
        personalDetails: true,
        resume: true,
        candidatePreferences: true,
        socialLinks: true,
      },
    });

    return NextResponse.json({ success: true, data: fullProfile });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error", error }, { status: 500 });
  }
}

// ─── PATCH: Update Profile (Private) ─────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = UpdateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    // Update the profile table
    const updatedProfile = await prisma.profile.update({
      where: { userId: userId },
      data: parsed.data,
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 500 });
  }
}

// ─── DELETE: Reset Profile Data (Private) ────────────────────────────────────
// Note: This doesn't delete the User account, just wipes profile fields.
export async function DELETE(req: NextRequest) {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    await prisma.profile.update({
      where: { userId },
      data: {
        profileTitle: null,
        profileHeadline: null,
        description: null,
        avatar: null,
      },
    });

    return NextResponse.json({ success: true, message: "Profile cleared" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}