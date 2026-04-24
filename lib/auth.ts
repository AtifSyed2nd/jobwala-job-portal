import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET!;

// ============================================================
// TYPES
// ============================================================
export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
  username: string;
}

// ============================================================
// PASSWORD
// ============================================================
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// ============================================================
// JWT and Token
// ============================================================

// ✅ Strict payload typing
export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

// ============================================================
// AUTH HELPERS
// ============================================================

// ✅ If you still want raw token
export function getTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get("auth_token")?.value || null;
}

// ✅ FIXED: return decoded user (NOT string)
export function getUserFromRequest(
  req: NextRequest
): JwtPayload | null {
  const token = getTokenFromRequest(req);

  if (!token) return null;

  return verifyToken(token);
}