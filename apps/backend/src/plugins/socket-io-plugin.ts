import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { Server, ServerOptions } from 'socket.io';
import * as config from '../config';
import { WebSocketMessage } from 'common-src';

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: (message: WebSocketMessage) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

declare module 'fastify' {
  interface FastifyInstance {
    io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
  }
}

export const socketIoPlugin: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  const options: Partial<ServerOptions> = config.nodeEnv === 'DEVELOPMENT' ? {
    cors: {
      origin: config.frontendURL,
    }
  } : {};
  const socketIO = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(fastify.server, options);

  fastify.decorate('io', socketIO);
  fastify.addHook('onClose', (fastify, done) => {
    fastify.io.close()
    done()
  });
});
