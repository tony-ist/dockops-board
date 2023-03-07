import {
  GetContainerAllResponse,
  GetContainerLogsRequest,
  PostCreateContainerRequest,
  DbContainerId,
  getContainerAllSchema,
  getContainerLogsSchema,
  Message,
  postContainerAttachSchema,
  postContainerCreateSchema,
  postContainerStartSchema,
  PostCreateContainerResponse,
  WebSocketResponseEvents,
} from 'common-src';
import { FastifyInstance } from 'fastify';

// Error "Target allows only 0 element(s) but source may have more." means you forgot "references" for type in common-src/types/model-types.ts
// https://github.com/ThomasAribart/json-schema-to-ts#references
export async function containerController(fastify: FastifyInstance) {
  fastify.route<{ Reply: GetContainerAllResponse }>({
    method: 'GET',
    url: '/all',
    schema: getContainerAllSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const prisma = fastify.prisma;
      const containers = await prisma.container.findMany();
      const result: GetContainerAllResponse = containers.map((container) => ({
        id: container.id,
        image: container.image ?? undefined,
        dockerId: container.dockerId ?? undefined,
        dockerState: container.dockerState ?? undefined,
        dockerName: container.dockerName,
        buildStatus: fastify.buildManager.get(container.id),
        createdAt: container.createdAt.toString(),
        updatedAt: container.updatedAt.toString(),
      }));
      reply.send(result);
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
