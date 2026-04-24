import { successResponse } from "@/lib/api-response";

export async function DELETE() {
  const response = successResponse({ message: "Logged out successfully" });
  
  // Wipe the cookie by setting maxAge to 0
 response.cookies.set("auth_token", "", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 0,
  path: "/",
});

  return response;
}