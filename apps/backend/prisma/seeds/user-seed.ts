import { PrismaClient } from '@prisma/client';

// TODO: Display how many records were inserted
export async function userSeed(prisma: PrismaClient) {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dockops-board.com' },
    update: {},
    create: {
      email: 'admin@dockops-board.com',
      passwordHash: '$2a$12$dTbTH1sfHjaTBnRVXAOEMunGfh/57Jw7u9zm0qkU3OpqXhhukG/B.', // password is 12345
    },
  });

  // eslint-disable-next-line no-console
  console.log({ admin });
}
