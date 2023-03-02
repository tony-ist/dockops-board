import {
  getContainerAllSchema,
  postContainerStartSchema,
  postContainerCreateSchema,
  postContainerAttachSchema,
  getContainerLogsSchema,
} from 'common-src';
import { dockerService } from '../services/docker-service';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { FastifyInstance } from 'fastify';
import { containerService } from '../services/container-service';

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

      const socket = fastify.socketManager.get();

      if (socket === null) {
        throw new Error('Socket manager returned null socket');
      }

      containerService
        .fetchSourceBuildImageAndCreateContainer({
          fastify,
          githubURL,
          imageName,
          containerName,
          dockerfileName,
          containerPort,
          hostPort,
          socket,
        })
        .catch((error) => {
          if (socket !== null) {
            socket.emit('message', error.message);
          }
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
      const result = await dockerService.runContainer({ fastify, dbContainerId: containerId });
      reply.send({ message: 'Container started.', result });
    },
  });

  fastifyTyped.route<ContainerIdParams>({
    method: 'POST',
    url: '/:containerId/attach',
    schema: postContainerAttachSchema,
    handler: async (request, reply) => {
      const { containerId } = request.params;
      const socket = fastify.socketManager.get();
      const runStream = await dockerService.attachContainer({ fastify, dbContainerId: containerId });
      runStream.on('data', (data) => {
        const message = data.toString();
        if (socket !== null) {
          socket.emit('message', message);
        }
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
      const socket = fastify.socketManager.get();
      const logsStream = await dockerService.containerLogs({
        fastify,
        dbContainerId: containerId,
        tail,
      });
      logsStream.on('data', (data) => {
        const message = data.toString();
        if (socket !== null) {
          socket.emit('message', message);
        }
        fastify.log.info(message);
      });
      reply.send({ message: 'Sending container logs via websocket.' });
    },
  });
}
