import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import Dockerode from 'dockerode';
import Docker from 'dockerode';
import * as config from '../config';

declare module 'fastify' {
  interface FastifyInstance {
    docker: Dockerode;
  }
}

export const dockerodePlugin: FastifyPluginAsync = fastifyPlugin(async (server) => {
  const docker = new Docker({ socketPath: config.dockerSockPath });

  server.decorate('docker', docker);
});
