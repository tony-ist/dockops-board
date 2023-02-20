import { FastifyInstance } from 'fastify';
import { postUsersNewSchema } from '../schema/user-schema';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export async function userController(fastify: FastifyInstance) {
  const fastifyWithTypeProvider = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  fastifyWithTypeProvider.route({
    method: 'POST',
    url: '/new',
    schema: postUsersNewSchema,
    handler: async (request, reply) => {
      const result = await fastify.prisma.user.create({
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
