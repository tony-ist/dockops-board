import Docker from 'dockerode';
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { dockerSockPath, port } from './config';

const server: FastifyInstance = Fastify({ logger: true });
const docker = new Docker({ socketPath: dockerSockPath });

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'array',
      },
    },
  },
};

server.get('/containers', opts, async (request, reply) => {
  const containerInfos = await docker.listContainers();
  const images = containerInfos.map((info) => info.Image);
  reply.send(images);
});

server.listen({ port }).catch((error) => {
  server.log.error(error);
  process.exit(1);
});
