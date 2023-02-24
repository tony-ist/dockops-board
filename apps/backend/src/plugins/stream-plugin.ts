import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { StreamManager } from '../services/stream-manager';

declare module 'fastify' {
  interface FastifyInstance {
    stream: StreamManager;
  }
}

export const streamPlugin: FastifyPluginAsync = fastifyPlugin(async (server) => {
  const streamManager = new StreamManager();

  server.decorate('stream', streamManager);
});
