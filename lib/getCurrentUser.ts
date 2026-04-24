import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies(); // ✅ FIX

  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
      profile: {
        select: {
          avatar: true,
          profileTitle: true,
        },
      },
    },
  });

  return user;
}