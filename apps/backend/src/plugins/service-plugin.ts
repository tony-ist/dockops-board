import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { DockerService } from '../services/docker-service';
import { ContainerService } from '../services/container-service';
import { SourceFetchService } from '../services/source-fetch-service';

declare module 'fastify' {
  interface FastifyInstance {
    dockerService: DockerService;
    containerService: ContainerService;
    sourceFetchService: SourceFetchService;
  }
}

export const servicePlugin: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  const dockerService = new DockerService(fastify);
  const containerService = new ContainerService(fastify);
  const sourceFetchService = new SourceFetchService(fastify);

  fastify.decorate('dockerService', dockerService);
  fastify.decorate('containerService', containerService);
  fastify.decorate('sourceFetchService', sourceFetchService);
});
