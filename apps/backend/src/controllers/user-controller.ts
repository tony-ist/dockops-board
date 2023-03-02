import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { FastifyInstance } from 'fastify';
import {postUsersNewSchema} from 'common-src';

export async function userController(fastify: FastifyInstance) {
  const fastifyTyped = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  fastifyTyped.route({
    method: 'POST',
    url: '/new',
    schema: postUsersNewSchema,
    handler: async (request, reply) => {
      const result = await fastifyTyped.prisma.user.create({
        data: {
          email: request.body.email,
          passwordHash: '12345',
          githubToken: request.body.githubToken ?? null,
        },
      });

      reply.send({
        ...result,
        createdAt: result.createdAt.toString(),
        updatedAt: result.updatedAt.toString(),
      });
    },
  });
}
