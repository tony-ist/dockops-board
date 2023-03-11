import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { Server, ServerOptions } from 'socket.io';
import * as config from '../config';
import { AppIOServer } from '../types/app-socket-io-types';

declare module 'fastify' {
  interface FastifyInstance {
    io: AppIOServer;
  }
}

export const socketIoPlugin: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  const options: Partial<ServerOptions> =
    config.nodeEnv === 'DEVELOPMENT'
      ? {
          cors: {
            origin: config.frontendURL,
          },
        }
      : {};
  const socketIO = new Server(fastify.server, options);

  fastify.decorate('io', socketIO);
  fastify.addHook('onClose', (fastify, done) => {
    fastify.io.close();
    done();
  });
});
