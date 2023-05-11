import { PrismaClient } from '@prisma/client';

export async function clearDb(prisma: PrismaClient) {
  const tables: { name: string }[] = await prisma.$queryRaw`SELECT name FROM sqlite_master WHERE type = "table"`;
  const promises = tables.map((table) => prisma.$executeRawUnsafe(`DELETE FROM ${table.name};`));
  return Promise.all(promises);
}
