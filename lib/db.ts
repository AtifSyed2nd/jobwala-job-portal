import { prisma } from "./prisma";

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("[DB] Connection failed:", error);
    return false;
  }
}

export { prisma };