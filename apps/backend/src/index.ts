import Fastify from 'fastify';
import cors from '@fastify/cors';
import * as config from './config';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { userController } from './controllers/user-controller';
import { prismaPlugin } from './plugins/prisma-plugin';
import { dockerodePlugin } from './plugins/dockerode-plugin';
import { containerController } from './controllers/container-controller';

function getLoggerOptions(environment: string) {
  if (environment === 'PRODUCTION') {
    return true;
  } else if (environment === 'DEVELOPMENT') {
    return {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    };
  } else {
    return true;
  }
}

const server = Fastify({ logger: getLoggerOptions(config.nodeEnv) }).withTypeProvider<JsonSchemaToTsProvider>();

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
  }

  if (config.serveStatic === 'TRUE') {
    await server.register(fastifyStatic, {
      root: path.join(__dirname, '..', 'dist', 'public'),
    });
  }

  await server.register(prismaPlugin);
  await server.register(dockerodePlugin);
  await server.register(userController, { prefix: '/v1/user' });
  await server.register(containerController, { prefix: '/v1/container' });

  await server.listen({ host: '0.0.0.0', port: config.port });
}

run().catch((error) => {
  server.log.error(error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  server.log.error(error);
  process.exit(1);
});
