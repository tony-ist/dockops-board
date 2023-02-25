import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { SocketManager } from '../services/socket-manager';

declare module 'fastify' {
  interface FastifyInstance {
    socketManager: SocketManager;
  }
}

export const socketPlugin: FastifyPluginAsync = fastifyPlugin(async (server) => {
  const socketManager = new SocketManager();

  server.decorate('socketManager', socketManager);
});
