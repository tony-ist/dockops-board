import {
  Container,
  DbContainerId,
  GetContainerAllResponse,
  getContainerAllSchema,
  GetContainerLogsRequest,
  getContainerLogsSchema,
  getContainerSchema,
  Message,
  postContainerAttachSchema,
  postContainerCreateSchema,
  postContainerStartSchema,
  postContainerStopSchema,
  PostCreateContainerRequest,
  PostCreateContainerResponse,
  WebSocketResponseEvents,
} from 'common-src';
import { FastifyInstance } from 'fastify';
import { Container as PrismaContainer } from '@prisma/client';
import { BuildManager } from '../services/build-manager';

function serializePrismaContainer(buildManager: BuildManager, prismaContainer: PrismaContainer): Container {
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

// Error "Target allows only 0 element(s) but source may have more." means you forgot "references" for type in common-src/types/model-types.ts
// https://github.com/ThomasAribart/json-schema-to-ts#references
export async function containerController(fastify: FastifyInstance) {
  fastify.route<{ Reply: GetContainerAllResponse }>({
    method: 'GET',
    url: '/all',
    schema: getContainerAllSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { prisma, buildManager } = fastify;
      const containers = await prisma.container.findMany();
      const result: GetContainerAllResponse = containers.map((container) =>
        serializePrismaContainer(buildManager, container)
      );
      reply.send(result);
    },
  });

  fastify.route<{ Params: DbContainerId; Reply: Container }>({
    method: 'GET',
    url: '/:dbContainerId',
    schema: getContainerSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { dbContainerId } = request.params;
      const { prisma, buildManager } = fastify;
      const container = await prisma.container.findFirstOrThrow({ where: { id: parseInt(dbContainerId) } });
      const serializedContainer = serializePrismaContainer(buildManager, container);
      reply.send(serializedContainer);
    },
  });

  fastify.route<{ Body: PostCreateContainerRequest; Reply: PostCreateContainerResponse }>({
    method: 'POST',
    url: '/create',
    schema: postContainerCreateSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const githubURL = request.body.githubURL;
      const imageName = 'tempimage';
      const containerName = request.body.containerName ?? 'tempcontainer';
      const dockerfileName = request.body.dockerfileName ?? 'Dockerfile';
      const { containerPort, hostPort } = request.body;
      const socket = request.ioSocket;

      const container = await fastify.prisma.container.create({
        data: {
          dockerName: containerName,
          doesExist: false,
        },
      });

      fastify.buildManager.set(container.id, 'building');

      fastify.containerService
        .fetchSourceBuildImageAndCreateContainer({
          dbContainerId: container.id,
          githubURL,
          imageName,
          containerName,
          dockerfileName,
          containerPort,
          hostPort,
          socket,
        })
        .then(() => {
          fastify.buildManager.set(container.id, 'success');
        })
        .catch((error) => {
          fastify.buildManager.set(container.id, 'error');
          socket?.emit('message', {
            event: WebSocketResponseEvents.BuildImageLogsResponse,
            text: error,
          });
          fastify.log.error(error);
        });

      reply.send({
        message: 'Fetching sources, building and creating a container. Sending results via websocket...',
        dbContainerId: container.id,
      });
    },
  });

  fastify.route<{ Params: DbContainerId; Reply: Message }>({
    method: 'POST',
    url: '/:dbContainerId/start',
    schema: postContainerStartSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { dbContainerId } = request.params;
      const result = await fastify.dockerService.startContainer({ dbContainerId: parseInt(dbContainerId) });
      reply.send({
        message: `Container with id "${dbContainerId}" started. Additional info: "${JSON.stringify(result, null, 2)}".`,
      });
    },
  });

  fastify.route<{ Params: DbContainerId; Reply: Message }>({
    method: 'POST',
    url: '/:dbContainerId/stop',
    schema: postContainerStopSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { dbContainerId } = request.params;
      const result = await fastify.dockerService.stopContainer({ dbContainerId: parseInt(dbContainerId) });
      reply.send({
        message: `Container with id "${dbContainerId}" stopped. Additional info: "${JSON.stringify(result, null, 2)}".`,
      });
    },
  });

  fastify.route<{ Params: DbContainerId; Reply: Message }>({
    method: 'POST',
    url: '/:dbContainerId/attach',
    schema: postContainerAttachSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { dbContainerId } = request.params;
      const socket = request.ioSocket;
      const runStream = await fastify.dockerService.attachContainer({ dbContainerId: parseInt(dbContainerId) });
      runStream.on('data', (data) => {
        const message = data.toString();
        socket?.emit('message', message);
        fastify.log.info(message);
      });
      reply.send({ message: 'Sending container logs via websocket.' });
    },
  });

  fastify.route<{ Params: DbContainerId; Querystring: GetContainerLogsRequest; Reply: Message }>({
    method: 'GET',
    url: '/:dbContainerId/logs',
    schema: getContainerLogsSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { dbContainerId } = request.params;
      const { tail } = request.query;
      const socket = request.ioSocket;
      const logsStream = await fastify.dockerService.containerLogs({
        dbContainerId: parseInt(dbContainerId),
        tail,
      });
      logsStream.on('data', (data) => {
        const message = data.toString();
        socket?.emit('message', message);
        fastify.log.info(message);
      });
      reply.send({ message: 'Sending container logs via websocket.' });
    },
  });
}
