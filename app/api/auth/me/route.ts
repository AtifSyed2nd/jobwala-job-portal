import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/api-response";

// ✅ Disable caching for auth endpoint to prevent stale data
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // ✅ Get token from cookie
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return errorResponse({
        message: "Unauthorized: No token",
        status: 401,
      });
    }

    // ✅ Verify token
    const decoded = verifyToken(token);

    if (!decoded || !decoded.userId) {
      return errorResponse({
        message: "Unauthorized: Invalid or expired session",
        status: 401,
      });
    }

    // ✅ Fetch user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: userSelectFields,
    });

    if (!user) {
      return errorResponse({
        message: "User not found",
        status: 404,
      });
    }

    // ✅ Success
    const response = successResponse({
      message: "User fetched successfully",
      data: { user },
    });

    // ✅ Set cache headers to prevent browser caching
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;

  } catch (error) {
    console.error("[AUTH_ME_ERROR]", error);

    return errorResponse({
      message: "Something went wrong while fetching user",
      status: 500,
    });
  }
}

// ✅ Centralized safe select
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
  profile: {
    select: {
      avatar: true,
      profileTitle: true,
    },
  },
};