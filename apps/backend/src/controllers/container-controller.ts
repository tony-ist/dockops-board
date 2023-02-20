import { FastifyInstance } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { getContainerAllSchema } from '../schema/container-schema';
import { dockerService } from '../services/docker-service';

export async function containerController(fastify: FastifyInstance) {
  const fastifyWithTypeProvider = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  fastifyWithTypeProvider.route({
    method: 'GET',
    url: '/all',
    schema: getContainerAllSchema,
    handler: async (request, reply) => {
      const response = await dockerService.getAllContainers(fastify.docker);
      reply.send(response);
    },
  });
}
