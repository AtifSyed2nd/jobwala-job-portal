import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-response";
import { comparePassword, signToken } from "@/lib/auth"; // ✅ new minimal auth
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// ✅ keep this local (no need to over-abstract yet)
function getRedirectUrlByRole(role: string) {
  switch (role) {
    case "CANDIDATE":
      return "/candidate/profile";
    case "RECRUITER":
      return "/recruiter/profile";
    case "ADMIN":
      return "/admin";
    case "SUPER_ADMIN":
      return "/admin";
    default:
      return "/";
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Parse + validate
    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse({
        message: "Invalid input",
        errors: parsed.error.flatten().fieldErrors,
        status: 400,
      });
    }

    const { email, password } = parsed.data;

    // 2. Fetch user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    // 3. Validate user existence
    if (!user || !user.password) {
      return errorResponse({
        message: "Invalid email or password",
        status: 401,
      });
    }

    // 4. Compare password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return errorResponse({
        message: "Invalid email or password",
        status: 401,
      });
    }

    // 5. Generate JWT
    const token = signToken({
      userId: user.id,
      role: user.role,
      email: user.email,
      username: user.username, // ✅ FIX
    });

    // 6. Build response
    const response = successResponse({
      message: "Welcome back!",
      data: {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
          avatar: user.profile?.avatar || null,
        },
        redirectUrl: getRedirectUrlByRole(user.role),
      },
    });

    // 7. Set secure cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);

    return errorResponse({
      message: "An error occurred during login",
      status: 500,
    });
  }
}
