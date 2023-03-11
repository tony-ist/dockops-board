import {
  Container,
  ContainerWithMessageSchema,
  DbContainerIdString,
  GetContainerAllResponse,
  getContainerAllSchema,
  GetContainerLogsRequest,
  getContainerLogsSchema,
  getContainerSchema,
  Message,
  postContainerCreateSchema,
  postContainerStartSchema,
  postContainerStopSchema,
  PostCreateContainerRequest,
  WebSocketResponseEvents,
} from 'common-src';
import { FastifyInstance } from 'fastify';
import { serializePrismaContainer } from '../serializers/container-serializers';

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

  fastify.route<{ Params: DbContainerIdString; Reply: Container }>({
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

  fastify.route<{ Body: PostCreateContainerRequest; Reply: ContainerWithMessageSchema }>({
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
      const { buildManager } = fastify;

      if (!socket) {
        fastify.log.info(`Socket is "${socket}" for request "${request.id}".`);
      }

      const container = await fastify.prisma.container.create({
        data: {
          dockerName: containerName,
          doesExist: false,
        },
      });

      buildManager.set(container.id, 'building');

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
          buildManager.set(container.id, 'success');
        })
        .catch((error) => {
          buildManager.set(container.id, 'error');
          socket?.emit(WebSocketResponseEvents.CreateContainerResponse, {
            error: error.message,
          });
          fastify.log.error(error);
        });

      reply.send({
        message: 'Fetching sources, building and creating a container. Sending results via websocket...',
        container: serializePrismaContainer(buildManager, container),
      });
    },
  });

  fastify.route<{ Params: DbContainerIdString; Reply: Message }>({
    method: 'POST',
    url: '/:dbContainerId/start',
    schema: postContainerStartSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { dbContainerId: dbContainerIdString } = request.params;
      const dbContainerId = parseInt(dbContainerIdString);
      const result = await fastify.dockerService.startContainer({ dbContainerId });
      reply.send({
        message: `Container with id "${dbContainerIdString}" started. Additional info: "${JSON.stringify(
          result,
          null,
          2
        )}".`,
      });
    },
  });

  fastify.route<{ Params: DbContainerIdString; Reply: Message }>({
    method: 'POST',
    url: '/:dbContainerId/stop',
    schema: postContainerStopSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { dbContainerId: dbContainerIdString } = request.params;
      const dbContainerId = parseInt(dbContainerIdString);
      const result = await fastify.dockerService.stopContainer({ dbContainerId });
      reply.send({
        message: `Container with id "${dbContainerIdString}" stopped. Additional info: "${JSON.stringify(
          result,
          null,
          2
        )}".`,
      });
    },
  });

  fastify.route<{ Params: DbContainerIdString; Querystring: GetContainerLogsRequest; Reply: Message }>({
    method: 'GET',
    url: '/:dbContainerId/logs',
    schema: getContainerLogsSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { dbContainerId } = request.params;
      const { tail } = request.query;
      const socket = request.ioSocket;
      const logsStream = await fastify.dockerService.listenContainerLogs({
        dbContainerId: parseInt(dbContainerId),
        tail,
      });
      logsStream.on('data', (data) => {
        const text: string = data.toString();
        socket?.emit(WebSocketResponseEvents.ContainerLogsResponse, {
          dbContainerId: parseInt(dbContainerId),
          text: text,
        });
        fastify.log.info(text);
      });
      reply.send({ message: 'Sending container logs via websocket.' });
    },
  });
}
