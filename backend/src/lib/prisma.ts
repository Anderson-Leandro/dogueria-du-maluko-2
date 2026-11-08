import { PrismaClient } from "@prisma/client";

/** Instância única do PrismaClient compartilhada por todos os models */
export const prisma = new PrismaClient();
