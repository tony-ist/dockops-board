import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { fastifyJwt } from '@fastify/jwt';
import * as config from '../config';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => void;
  }
}

export const authenticatePlugin: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  await fastify.register(fastifyJwt, { secret: config.secret as string });

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const verificationResult = await request.jwtVerify();
      console.log(verificationResult);
    } catch (err) {
      reply.send(err);
    }
  });
});
