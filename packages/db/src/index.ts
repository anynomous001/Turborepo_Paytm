// Import PrismaClient and Prisma types
import { PrismaClient, Prisma } from "@prisma/client";

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Export both prisma instance and Prisma types
export { prisma, Prisma };
