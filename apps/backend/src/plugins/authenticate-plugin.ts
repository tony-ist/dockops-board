import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { fastifyJwt } from '@fastify/jwt';
import * as config from '../config';
import { User } from '@prisma/client';
import { JwtToken } from '../types/jwt-token';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtToken;
    user: User;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => void;
  }
}

export const authenticatePlugin: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  await fastify.register(fastifyJwt, { secret: config.secret as string });

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const verificationResult = await request.jwtVerify<JwtToken>();
      const { userId } = verificationResult;
      request.user = await fastify.prisma.user.findFirstOrThrow({ where: { id: userId } });
    } catch (err) {
      reply.send(err);
    }
  });
});
