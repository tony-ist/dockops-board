import { getContainerAllSchema, postContainerNewSchema } from '../schema/container-schema';
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
      const response = await dockerService.getAllContainers(fastifyTyped.docker);
      reply.send(response);
    },
  });

  fastifyTyped.route({
    method: 'POST',
    url: '/new',
    schema: postContainerNewSchema,
    handler: async (request, reply) => {
      const githubURL = request.body.githubURL;
      const imageName = 'tempimage';
      const containerName = request.body.containerName ?? 'tempcontainer';
      const dockerfileName = request.body.dockerfileName ?? 'Dockerfile';
      const { containerPort, hostPort } = request.body;

      const socket = fastify.socketManager.get();
      containerService
        .fetchSourceBuildImageAndRunContainer({
          fastify,
          githubURL,
          imageName,
          containerName,
          dockerfileName,
          containerPort,
          hostPort,
        })
        .catch((error) => {
          if (socket !== null) {
            socket.emit('message', error.message);
          }
          fastify.log.error(error);
        });

      reply.send({ message: 'Fetching sources, building and starting a container. Sending results via websocket...' });
    },
  });
}
