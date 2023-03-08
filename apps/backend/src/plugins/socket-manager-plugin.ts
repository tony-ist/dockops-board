import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { SocketManager } from '../services/socket-manager';
import { Socket } from 'socket.io';

declare module 'fastify' {
  interface FastifyInstance {
    socketManager: SocketManager;
  }

  interface FastifyRequest {
    ioSocket: Socket | undefined;
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
