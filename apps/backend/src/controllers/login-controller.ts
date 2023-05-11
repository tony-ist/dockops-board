import { PostLoginRequest, postLoginSchema } from 'common-src';
import { FastifyInstance } from 'fastify';
import { config } from '../config';

export async function loginController(fastify: FastifyInstance) {
  fastify.route<{ Body: PostLoginRequest; Reply: string }>({
    method: 'POST',
    url: '/',
    schema: postLoginSchema,
    handler: async (request, reply) => {
      // console.log('hash:', await fastify.bcrypt.hash(request.body.password));
      const user = await fastify.prisma.user.findFirst({ where: { email: request.body.email } });

      if (user === null) {
        reply.code(401);
        return reply.send();
      }

      const isMatch = await fastify.bcrypt.compare(request.body.password, user.passwordHash);

      if (!isMatch) {
        reply.code(401);
        return reply.send();
      }

      const jwtToken = await reply.jwtSign({ userId: user.id }, { expiresIn: config.jwtExpiration });
      return reply.send(jwtToken);
    },
  });
}
