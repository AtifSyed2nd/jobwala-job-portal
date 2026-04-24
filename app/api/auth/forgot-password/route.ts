// import crypto from "crypto";
// import { sendEmail } from "@/lib/email";

// export async function POST(req: Request) {
//   const { email } = await req.json();

//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user) {
//     return successResponse({ message: "If email exists, reset link sent" });
//   }

//   const token = crypto.randomBytes(32).toString("hex");

//   await prisma.passwordResetToken.create({
//     data: {
//       token,
//       userId: user.id,
//       expiresAt: new Date(Date.now() + 1000 * 60 * 15),
//     },
//   });

//   const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;

//   await sendEmail({
//     to: user.email,
//     subject: "Reset your password",
//     html: `
//       <h2>Password Reset</h2>
//       <p>Click below to reset your password:</p>
//       <a href="${resetLink}">Reset Password</a>
//       <p>This link expires in 15 minutes.</p>
//     `,
//   });

//   return successResponse({
//     message: "If email exists, reset link sent",
//   });
// }