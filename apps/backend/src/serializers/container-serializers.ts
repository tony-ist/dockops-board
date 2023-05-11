import { BuildManager } from '../services/build-manager';
import { Container as DbContainer } from '.prisma/client';
import { Container } from 'common-src';
import { DockerState } from '../types/docker-state';

export function serializeDbContainer(buildManager: BuildManager, dbContainer: DbContainer): Container {
  return {
    id: dbContainer.id,
    image: dbContainer.image ?? undefined,
    dockerId: dbContainer.dockerId ?? undefined,
    dockerState: (dbContainer.dockerState as DockerState | undefined) ?? undefined,
    dockerName: dbContainer.dockerName,
    buildStatus: buildManager.get(dbContainer.id),
    doesExist: dbContainer.doesExist,
    createdAt: dbContainer.createdAt.toString(),
    updatedAt: dbContainer.updatedAt.toString(),
  };
}
