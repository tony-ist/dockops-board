import cors from '@fastify/cors';
import * as config from './config';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyStatic from '@fastify/static';
import fastifySocketIO from 'fastify-socket.io';
import path from 'path';
import { userController } from './controllers/user-controller';
import { prismaPlugin } from './plugins/prisma-plugin';
import { dockerodePlugin } from './plugins/dockerode-plugin';
import { containerController } from './controllers/container-controller';
import { server } from './server';
import { socketPlugin } from './plugins/socket-plugin';
import { WebSocketMessage, WebSocketRequestEvents } from 'common-src';
import { EventHandler, isNotUndefined, webSocketEventHandlers } from './services/web-socket-event-handlers';

async function run() {
  await server.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Dockops-board API specification',
        description: 'Dockops-board is an open source manager for docker containers with web UI',
        version: '0.0.0',
      },
    },
  });
  await server.register(fastifySwaggerUI);

  if (config.nodeEnv === 'DEVELOPMENT') {
    await server.register(cors);
    await server.register(fastifySocketIO, {
      cors: {
        origin: '*',
      },
    });
  } else {
    await server.register(fastifySocketIO);
  }

  if (config.serveStatic === 'TRUE') {
    await server.register(fastifyStatic, {
      root: path.join(__dirname, '..', 'dist', 'public'),
    });
  }

  await server.register(socketPlugin);
  await server.register(prismaPlugin);
  await server.register(dockerodePlugin);
  await server.register(userController, { prefix: '/v1/user' });
  await server.register(containerController, { prefix: '/v1/container' });

  server.io.on('connection', (socket) => {
    socket.on('message', (message: WebSocketMessage) => {
      const handler: EventHandler | undefined = webSocketEventHandlers[message.event as WebSocketRequestEvents];

      if (isNotUndefined(handler)) {
        handler(server, socket, message).catch((error: { message: string }) => {
          server.log.error(error);
          socket.emit('message', error.message);
        });
        return;
      }

      const errorMessage = `Unrecognized websocket event "${message.event}".`;
      server.log.error(errorMessage);
      socket.emit('message', errorMessage);
    });

    server.log.info(`Socket connection established: ${socket.id}`);
    server.socketManager.set(socket);
  });

  await server.listen({ host: '0.0.0.0', port: config.port });
}

run().catch((error) => {
  server.log.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  server.log.error('Unhandled promise rejection error.');
  server.log.error(error);
  process.exit(1);
});
