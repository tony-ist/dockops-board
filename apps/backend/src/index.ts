import Docker from 'dockerode';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import * as config from './config';
import { PrismaClient } from '@prisma/client';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

const server = Fastify({ logger: true }).withTypeProvider<JsonSchemaToTsProvider>();

async function run() {
  const docker = new Docker({ socketPath: config.dockerSockPath });
  const prisma = new PrismaClient();

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

  const getContainersOptions = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              image: { type: 'string' },
            },
          },
        },
      },
    },
  } as const;

  server.get('/v1/containers', getContainersOptions, async (request, reply) => {
    const containerInfos = await docker.listContainers();
    const response = containerInfos.map((info) => ({ image: info.Image }));
    reply.send(response);
  });

  const postUsersNewOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            password: { type: 'string' },
            githubToken: { type: ['string', 'null'] },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
      },
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
          githubToken: { type: 'string' },
        },
        required: ['email', 'password'],
      },
    },
  } as const;

  server.post('/v1/users/new', postUsersNewOptions, async (request, reply) => {
    const result = await prisma.user.create({
      data: {
        email: request.body.email,
        passwordHash: '12345',
        githubToken: request.body.githubToken ?? null,
      },
    });

    reply.send({
      ...result,
      createdAt: result.createdAt.toString(),
      updatedAt: result.updatedAt.toString(),
    });
  });

  await server.listen({ port: config.port });
}

run().catch((error) => {
  server.log.error(error);
  process.exit(1);
});
