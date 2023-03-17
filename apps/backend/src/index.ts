import cors from '@fastify/cors';
import { config } from './config';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { userController } from './controllers/user-controller';
import { prismaPlugin } from './plugins/prisma-plugin';
import { dockerodePlugin } from './plugins/dockerode-plugin';
import { containerController } from './controllers/container-controller';
import { fastify } from './server';
import { socketManagerPlugin } from './plugins/socket-manager-plugin';
import {
  containerAllResponseSchema,
  containerSchema,
  dbContainerIdSchema,
  logSchema,
  messageSchema,
  userSchema,
} from 'common-src';
import { fastifyCookie } from '@fastify/cookie';
import { servicePlugin } from './plugins/service-plugin';
import { authenticatePlugin } from './plugins/authenticate-plugin';
import { loginController } from './controllers/login-controller';
import fastifyBcrypt from 'fastify-bcrypt';
import { webSocketConnectionHandler } from './handlers/web-socket-connection-handler';
import { socketIoPlugin } from './plugins/socket-io-plugin';
import { listenDockerEvents } from './handlers/docker-events-handler';
import { registerSocketIOMiddleware } from './middleware/socket-io-middleware';
import { dockerSync } from './startup/docker-sync';

async function run() {
  await fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Dockops-board API specification',
        description: 'Dockops-board is an open source manager for docker containers with web UI',
        version: '0.0.0',
      },
    },
    refResolver: {
      buildLocalReference(json) {
        return json.title as string;
      },
    },
  });
  await fastify.register(fastifySwaggerUI);

  if (config.nodeEnv === 'DEVELOPMENT') {
    await fastify.register(cors, {
      origin: config.frontendURL,
      credentials: true,
    });
  }

  if (config.serveStatic === 'TRUE') {
    await fastify.register(fastifyStatic, {
      root: path.join(__dirname, '..', 'dist', 'public'),
    });
  }

  await fastify.register(fastifyBcrypt, {
    saltWorkFactor: config.bcryptSaltWorkFactor,
  });
  await fastify.register(fastifyCookie);

  await fastify.register(socketIoPlugin);
  await fastify.register(authenticatePlugin);
  await fastify.register(servicePlugin);
  await fastify.register(socketManagerPlugin);
  await fastify.register(prismaPlugin);
  await fastify.register(dockerodePlugin);
  await fastify.register(loginController, { prefix: '/v1/login' });
  await fastify.register(userController, { prefix: '/v1/user' });
  await fastify.register(containerController, { prefix: '/v1/container' });

  fastify.addSchema(userSchema);
  fastify.addSchema(containerSchema);
  fastify.addSchema(messageSchema);
  fastify.addSchema(logSchema);
  fastify.addSchema(containerAllResponseSchema);
  fastify.addSchema(dbContainerIdSchema);

  registerSocketIOMiddleware(fastify);
  fastify.io.on('connection', (socket) => webSocketConnectionHandler(fastify, socket));

  await listenDockerEvents(fastify);
  await dockerSync(fastify);

  await fastify.listen({ host: '0.0.0.0', port: config.port });
}

run().catch((error) => {
  fastify.log.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  fastify.log.error('Unhandled promise rejection error.');
  fastify.log.error(error);
  process.exit(1);
});
