import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDbUrl() {
  const url = process.env.POSTGRES_URL || '';
  if (!url) return undefined;
  if (url.includes('statement_cache_size=')) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}pgbouncer=true&statement_cache_size=0`;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: getDbUrl(),
  });

globalForPrisma.prisma = prisma;
