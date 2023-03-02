import {
  getContainerAllSchema,
  getContainerLogsSchema,
  postContainerAttachSchema,
  postContainerCreateSchema,
  postContainerStartSchema,
  WebSocketResponseEvents,
} from 'common-src';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { FastifyInstance } from 'fastify';

// TODO: Add autosubscribe field to request schema, if true, then send logs via socket
export async function containerController(fastify: FastifyInstance) {
  const fastifyTyped = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  fastifyTyped.route({
    method: 'GET',
    url: '/all',
    schema: getContainerAllSchema,
    handler: async (request, reply) => {
      const prisma = fastify.prisma;
      const containers = await prisma.container.findMany();
      reply.send(containers);
    },
  });

  fastifyTyped.route({
    method: 'POST',
    url: '/create',
    schema: postContainerCreateSchema,
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
            event: WebSocketResponseEvents.BuildImageLogs,
            text: error,
          });
          fastify.log.error(error);
        });

      reply.send({ message: 'Fetching sources, building and creating a container. Sending results via websocket...' });
    },
  });

  type ContainerIdParams = { Params: { containerId: number } };

  fastifyTyped.route<ContainerIdParams>({
    method: 'POST',
    url: '/:containerId/start',
    schema: postContainerStartSchema,
    handler: async (request, reply) => {
      const { containerId } = request.params;
      const result = await fastify.dockerService.runContainer({ dbContainerId: containerId });
      reply.send({ message: 'Container started.', result });
    },
  });

  fastifyTyped.route<ContainerIdParams>({
    method: 'POST',
    url: '/:containerId/attach',
    schema: postContainerAttachSchema,
    handler: async (request, reply) => {
      const { containerId } = request.params;
      const socket = request.ioSocket;
      const runStream = await fastify.dockerService.attachContainer({ dbContainerId: containerId });
      runStream.on('data', (data) => {
        const message = data.toString();
        socket?.emit('message', message);
        fastify.log.info(message);
      });
      reply.send({ message: 'Sending container logs via websocket.' });
    },
  });

  fastifyTyped.route({
    method: 'GET',
    url: '/:containerId/logs',
    schema: getContainerLogsSchema,
    handler: async (request, reply) => {
      const { containerId } = request.params as ContainerIdParams['Params'];
      const { tail } = request.query;
      const socket = request.ioSocket;
      const logsStream = await fastify.dockerService.containerLogs({
        dbContainerId: containerId,
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
