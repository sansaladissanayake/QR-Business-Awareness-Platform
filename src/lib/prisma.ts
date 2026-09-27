import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDbUrl() {
  const url =
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    '';
  if (!url) return undefined;
  if (url.includes('statement_cache_size=')) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}pgbouncer=true&statement_cache_size=0`;
}

const dbUrl = getDbUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(
    dbUrl ? { datasourceUrl: dbUrl } : undefined
  );

globalForPrisma.prisma = prisma;
