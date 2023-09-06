import { PortForward } from 'common-src';
import { PortForward as DbPortForward } from '@prisma/client';

export function serializePortForward(dbPortForward: DbPortForward): PortForward {
  return {
    id: dbPortForward.id,
    dbContainerId: dbPortForward.id,
    hostPort: dbPortForward.hostPort,
    containerPort: dbPortForward.containerPort,
    createdAt: dbPortForward.createdAt.toString(),
    updatedAt: dbPortForward.updatedAt.toString(),
  };
}
