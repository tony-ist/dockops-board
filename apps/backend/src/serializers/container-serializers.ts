import { BuildManager } from '../services/build-manager';
import { Container as PrismaContainer } from '.prisma/client';
import { Container } from 'common-src';

export function serializePrismaContainer(buildManager: BuildManager, prismaContainer: PrismaContainer): Container {
  return {
    id: prismaContainer.id,
    image: prismaContainer.image ?? undefined,
    dockerId: prismaContainer.dockerId ?? undefined,
    dockerState: prismaContainer.dockerState ?? undefined,
    dockerName: prismaContainer.dockerName,
    buildStatus: buildManager.get(prismaContainer.id),
    createdAt: prismaContainer.createdAt.toString(),
    updatedAt: prismaContainer.updatedAt.toString(),
  };
}
