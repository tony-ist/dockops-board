import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { dockerSync, syncContainer } from '../../startup/docker-sync';
import { clearDb } from '../util/clear-db';
import { DockerState } from '../../types/docker-state';

// TODO: Configure env vars globally for tests
// https://vitest.dev/config/#globalsetup
dotenv.config({ path: '.env.test' });

describe('docker-sync', () => {
  let fastify: FastifyInstance;
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    fastify = Fastify();
    fastify.prisma = prisma;
    await clearDb(prisma);
  });

  describe('syncContainer', () => {
    it('should create db container', async () => {
      const dockerId = 'test-id';
      const image = 'test-image';
      const dockerName = 'test-name';
      const dockerState = DockerState.Running;
      const info = {
        Id: dockerId,
        Image: image,
        Names: [dockerName],
        State: dockerState,
      };

      await syncContainer(fastify, info as any);

      const containers = await prisma.container.findMany();

      expect(containers.length).toEqual(1);
      expect(containers[0]).toMatchObject({
        dockerId,
        image,
        dockerName,
        dockerState,
        doesExist: true,
      });
    });

    it('should update db container', async () => {
      const dockerId = 'test-id';
      const image = 'test-image';
      const dockerName = 'test-name';
      const dockerState = DockerState.Running;

      const image2 = 'test-image2';
      const dockerName2 = 'test-name2';
      const dockerState2 = DockerState.Paused;

      await prisma.container.create({
        data: {
          dockerId,
          image,
          dockerName,
          dockerState,
        },
      });
      const info = {
        Id: dockerId,
        Image: image2,
        Names: [dockerName2],
        State: dockerState2,
      };

      await syncContainer(fastify, info as any);

      const containers = await prisma.container.findMany();

      expect(containers.length).toEqual(1);
      expect(containers[0]).toMatchObject({
        dockerId,
        image: image2,
        dockerName: dockerName2,
        dockerState: dockerState2,
        doesExist: true,
      });
    });
  });

  describe('dockerSync', () => {
    it('should add db container', async () => {
      const dockerodeMock = {
        listContainers: () => [
          {
            Id: 'abc123',
            Names: ['container-mock-1'],
          },
        ],
      };

      fastify.docker = dockerodeMock as any;

      // await prisma.container.create({ data: { dockerName: 'test2', dockerId: 'czx321' } })

      await dockerSync(fastify);

      const containers = await prisma.container.findMany();

      expect(containers.length).toEqual(1);
    });

    it('should mark db container as non-existing in docker', async () => {
      const dockerId = 'test-id';
      const image = 'test-image';
      const dockerName = 'test-name';
      const dockerState = DockerState.Running;

      await prisma.container.create({
        data: {
          dockerId,
          image,
          dockerName,
          dockerState,
          doesExist: true,
        },
      });

      const dockerodeMock = {
        listContainers: () => [],
      };

      fastify.docker = dockerodeMock as any;

      await dockerSync(fastify);

      const containers = await prisma.container.findMany();

      expect(containers.length).toEqual(1);
      expect(containers[0].doesExist).toEqual(false);
    });
  });
});
