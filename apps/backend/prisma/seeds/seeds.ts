import { PrismaClient } from '@prisma/client';
import { userSeed } from './user-seed';

const prisma = new PrismaClient();

async function main() {
  await userSeed(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
