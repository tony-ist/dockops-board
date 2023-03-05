import {
  ContainerLogsRequest,
  CreateContainerRequest,
  DbContainerId,
  getContainerAllSchema,
  getContainerLogsSchema,
  Message,
  postContainerAttachSchema,
  postContainerCreateSchema,
  postContainerStartSchema,
  WebSocketResponseEvents,
} from 'common-src';
import { FastifyInstance } from 'fastify';
import { ContainerAllResponse } from 'frontend/src/generated-sources/backend-api';

// TODO: Add subscribe boolean field to request schema, if true, then send logs via socket
export async function containerController(fastify: FastifyInstance) {
  fastify.route<{ Reply: ContainerAllResponse }>({
    method: 'GET',
    url: '/all',
    schema: getContainerAllSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      console.log(`getAllContainers:`, request.user);
      const prisma = fastify.prisma;
      const containers = await prisma.container.findMany();
      reply.send(containers);
    },
  });

  fastify.route<{ Body: CreateContainerRequest; Reply: Message }>({
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

      fastify.containerService
        .fetchSourceBuildImageAndCreateContainer({
          githubURL,
          imageName,
          containerName,
          dockerfileName,
          containerPort,
          hostPort,
          socket,
        })
        .catch((error) => {
          socket?.emit('message', {
            event: WebSocketResponseEvents.BuildImageLogsResponse,
            text: error,
          });
          fastify.log.error(error);
        });

      reply.send({ message: 'Fetching sources, building and creating a container. Sending results via websocket...' });
    },
  });

  fastify.route<{ Params: DbContainerId; Reply: Message }>({
    method: 'POST',
    url: '/:dbContainerId/start',
    schema: postContainerStartSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { dbContainerId } = request.params;
      const result = await fastify.dockerService.runContainer({ dbContainerId });
      reply.send({ message: `Container with id "${dbContainerId}" started: "${JSON.stringify(result, null, 2)}".` });
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
      const runStream = await fastify.dockerService.attachContainer({ dbContainerId });
      runStream.on('data', (data) => {
        const message = data.toString();
        socket?.emit('message', message);
        fastify.log.info(message);
      });
      reply.send({ message: 'Sending container logs via websocket.' });
    },
  });

  fastify.route<{ Params: DbContainerId; Querystring: ContainerLogsRequest; Reply: Message }>({
    method: 'GET',
    url: '/:dbContainerId/logs',
    schema: getContainerLogsSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { dbContainerId } = request.params;
      const { tail } = request.query;
      const socket = request.ioSocket;
      const logsStream = await fastify.dockerService.containerLogs({
        dbContainerId,
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
