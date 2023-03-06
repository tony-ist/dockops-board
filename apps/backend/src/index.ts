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

async function run() {
  await server.register(fastifySwagger, {
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
  await server.register(fastifySwaggerUI);

  if (config.nodeEnv === 'DEVELOPMENT') {
    await server.register(cors, {
      origin: config.frontendURL,
      credentials: true,
    });
    await server.register(fastifySocketIO, {
      cors: {
        origin: config.frontendURL,
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

  await server.register(fastifyBcrypt, {
    saltWorkFactor: config.bcryptSaltWorkFactor,
  });
  await server.register(fastifyCookie);

  await server.register(authenticatePlugin);
  await server.register(servicePlugin);
  await server.register(socketPlugin);
  await server.register(prismaPlugin);
  await server.register(dockerodePlugin);
  await server.register(loginController, { prefix: '/v1/login' });
  await server.register(userController, { prefix: '/v1/user' });
  await server.register(containerController, { prefix: '/v1/container' });

  server.addSchema(userSchema);
  server.addSchema(containerSchema);
  server.addSchema(messageSchema);
  server.addSchema(logSchema);
  server.addSchema(containerAllResponseSchema);
  server.addSchema(dbContainerIdSchema);

  server.io.on('connection', (socket) => webSocketConnectionHandler(server, socket));

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
