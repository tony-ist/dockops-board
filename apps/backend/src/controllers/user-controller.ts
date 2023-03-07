import { FastifyInstance } from 'fastify';
import { postUsersNewSchema, User, PostUserNewRequest } from 'common-src';

export async function userController(fastify: FastifyInstance) {
  fastify.route<{ Body: PostUserNewRequest; Reply: User }>({
    method: 'POST',
    url: '/new',
    schema: postUsersNewSchema,
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const result = await fastify.prisma.user.create({
        data: {
          email: request.body.email,
          passwordHash: '12345',
          githubToken: request.body.githubToken,
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
