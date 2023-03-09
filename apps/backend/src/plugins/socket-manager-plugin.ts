import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { SocketManager } from '../services/socket-manager';
import type { AppSocket } from '../types/app-socket-io-types';

declare module 'fastify' {
  interface FastifyInstance {
    socketManager: SocketManager;
  }

  interface FastifyRequest {
    ioSocket: AppSocket | undefined;
  }
}

export const socketManagerPlugin: FastifyPluginAsync = fastifyPlugin(async (server) => {
  const socketManager = new SocketManager();

  server.decorate('socketManager', socketManager);
  server.addHook('onRequest', async (request) => {
    const socketId = request.cookies.socketId;
    request.ioSocket = socketManager.get(socketId as string);
  });
});
