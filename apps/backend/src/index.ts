import Docker from 'dockerode';
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import cors from '@fastify/cors';
import * as config from './config';

const server: FastifyInstance = Fastify({ logger: true });
const docker = new Docker({ socketPath: config.dockerSockPath });

if (config.nodeEnv === 'DEVELOPMENT') {
  server.register(cors);
}

const opts: RouteShorthandOptions = {
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
};

server.get('/containers', opts, async (request, reply) => {
  const containerInfos = await docker.listContainers();
  const response = containerInfos.map((info) => ({ image: info.Image }));
  reply.send(response);
});

server.listen({ port: config.port }).catch((error) => {
  server.log.error(error);
  process.exit(1);
});
