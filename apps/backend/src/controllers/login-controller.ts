import { LoginRequest, postLoginSchema } from 'common-src';
import { FastifyInstance } from 'fastify';

export async function loginController(fastify: FastifyInstance) {
  fastify.route<{ Body: LoginRequest; Reply: string }>({
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

      const jwtToken = fastify.jwt.sign({ userId: user.id });
      return reply.send(jwtToken);
    },
  });
}
