import { FastifyInstance } from 'fastify';
import { ContainerInfo } from 'dockerode';
import { Container as DbContainer } from '@prisma/client';

interface ContainerInfoByDockerId {
  [key: string]: ContainerInfo;
}

export async function dockerSync(fastify: FastifyInstance) {
  fastify.log.info('Syncing docker containers to DB...');
  const { docker, prisma } = fastify;
  const containerInfos = await docker.listContainers({ all: true });

  const containerInfoByDockerId: ContainerInfoByDockerId = {};
  containerInfos.forEach((info) => (containerInfoByDockerId[info.Id] = info));

  for (const info of containerInfos) {
    await syncContainer(fastify, info);
  }

  const dbContainers = await prisma.container.findMany();

  for (const dbContainer of dbContainers) {
    if (!doesDockerContainerExistsFor(dbContainer, containerInfoByDockerId)) {
      await markNonExisting(fastify, dbContainer);
    }
  }

  fastify.log.info('Successfully synced docker containers to DB.');
}

function doesDockerContainerExistsFor(dbContainer: DbContainer, infos: ContainerInfoByDockerId) {
  if (dbContainer.dockerId === null) {
    return false;
  }

  return infos[dbContainer.dockerId] !== undefined;
}

async function markNonExisting(fastify: FastifyInstance, dbContainer: DbContainer) {
  const { prisma } = fastify;
  prisma.container.update({
    where: { id: dbContainer.id },
    data: { doesExist: false },
  });
}

async function syncContainer(fastify: FastifyInstance, info: ContainerInfo) {
  if (info.Names.length === 0) {
    fastify.log.error(`Found a container without a name while syncing: "${JSON.stringify(info, null, 2)}".`);
  }

  const { prisma } = fastify;
  const dbContainer = await prisma.container.findFirst({ where: { dockerId: info.Id } });

  const infoName = info.Names[0];
  const dockerName = infoName.startsWith('/') ? infoName.slice(1) : infoName;

  const updatedDbContainer = {
    dockerId: info.Id,
    doesExist: true,
    dockerName,
    image: info.Image,
    dockerState: info.State,
  };

  if (dbContainer === null) {
    return prisma.container.create({
      data: updatedDbContainer,
    });
  }

  return prisma.container.update({
    where: { id: dbContainer.id },
    data: updatedDbContainer,
  });
}
