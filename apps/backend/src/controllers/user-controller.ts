import { FastifyInstance } from 'fastify';
import { postUsersNewSchema, User, UserNewRequest } from 'common-src';

export async function userController(fastify: FastifyInstance) {
  fastify.route<{ Body: UserNewRequest; Reply: User }>({
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
        id: result.id,
        email: result.email,
        githubToken: result.githubToken,
        createdAt: result.createdAt.toString(),
        updatedAt: result.updatedAt.toString(),
      });
    },
  });
}
