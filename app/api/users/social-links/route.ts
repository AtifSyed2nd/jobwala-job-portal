// import { NextRequest } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { verifyToken } from "@/lib/auth";
// import { successResponse, errorResponse } from "@/lib/api-response";
// import { z } from "zod";

// /* ============================================================
//    VALIDATION
// ============================================================ */
// const SocialSchema = z.object({
//   id: z.string().optional(),
//   platform: z.string().min(2),
//   url: z.string().url(),
//   username: z.string().optional().or(z.literal("")),
// });

// /* ============================================================
//    HELPERS
// ============================================================ */
// function getUser(req: NextRequest) {
//   const token = req.cookies.get("auth_token")?.value;
//   if (!token) return null;
//   return verifyToken(token);
// }

// function normalize(data: any) {
//   return Object.fromEntries(
//     Object.entries(data).map(([k, v]) => [k, v === "" ? null : v])
//   );
// }

// /* ============================================================
//    GET ALL
// ============================================================ */
// export async function GET(req: NextRequest) {
//   try {
//     const currentUser = getUser(req);
//     if (!currentUser) {
//       return errorResponse({ message: "Unauthorized", status: 401 });
//     }

//     const links = await prisma.socialLink.findMany({
//       where: { userId: currentUser.userId },
//       orderBy: { createdAt: "desc" },
//     });

//     return successResponse({ data: { links } });
//   } catch (error) {
//     console.error("[SOCIAL_GET]", error);
//     return errorResponse({ message: "Failed to fetch links", status: 500 });
//   }
// }

// /* ============================================================
//    POST (CREATE)
// ============================================================ */
// export async function POST(req: NextRequest) {
//   try {
//     const currentUser = getUser(req);
//     if (!currentUser) {
//       return errorResponse({ message: "Unauthorized", status: 401 });
//     }

//     const body = await req.json();

//     const parsed = SocialSchema.safeParse(body);
//     if (!parsed.success) {
//       return errorResponse({
//         message: "Validation failed",
//         errors: parsed.error.flatten().fieldErrors,
//         status: 422,
//       });
//     }

//     const data = normalize(parsed.data);

//     const link = await prisma.socialLink.create({
//       data: {
//         userId: currentUser.userId,
//         platform: data.platform!,
//         url: data.url!,
//         username: data.username ?? null,
//       },
//     });

//     return successResponse({
//       message: "Social link added",
//       data: { link },
//     });
//   } catch (error) {
//     console.error("[SOCIAL_POST]", error);
//     return errorResponse({ message: "Failed to create link", status: 500 });
//   }
// }

// /* ============================================================
//    PATCH (UPDATE)
// ============================================================ */
// export async function PATCH(req: NextRequest) {
//   try {
//     const currentUser = getUser(req);
//     if (!currentUser) {
//       return errorResponse({ message: "Unauthorized", status: 401 });
//     }

//     const body = await req.json();

//     const parsed = SocialSchema.safeParse(body);
//     if (!parsed.success || !parsed.data.id) {
//       return errorResponse({
//         message: "Invalid request",
//         status: 400,
//       });
//     }

//     const data = normalize(parsed.data);

//     const link = await prisma.socialLink.update({
//       where: { id: data.id },
//       data: {
//         platform: data.platform,
//         url: (data.url as string) ??  null,
//         username: (data.username as string) ??  null,
//       },
//     });

//     return successResponse({
//       message: "Social link updated",
//       data: { link },
//     });
//   } catch (error) {
//     console.error("[SOCIAL_PATCH]", error);
//     return errorResponse({ message: "Failed to update link", status: 500 });
//   }
// }

// /* ============================================================
//    DELETE
// ============================================================ */
// export async function DELETE(req: NextRequest) {
//   try {
//     const currentUser = getUser(req);
//     if (!currentUser) {
//       return errorResponse({ message: "Unauthorized", status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return errorResponse({ message: "ID required", status: 400 });
//     }

//     await prisma.socialLink.delete({
//       where: { id },
//     });

//     return successResponse({ message: "Social link deleted" });
//   } catch (error) {
//     console.error("[SOCIAL_DELETE]", error);
//     return errorResponse({ message: "Failed to delete link", status: 500 });
//   }
// }