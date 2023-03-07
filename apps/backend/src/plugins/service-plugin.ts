import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { DockerService } from '../services/docker-service';
import { ContainerService } from '../services/container-service';
import { SourceFetchService } from '../services/source-fetch-service';
import { BuildManager } from '../services/build-manager';

declare module 'fastify' {
  interface FastifyInstance {
    dockerService: DockerService;
    containerService: ContainerService;
    sourceFetchService: SourceFetchService;
    buildManager: BuildManager;
  }
}

export const servicePlugin: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  const dockerService = new DockerService(fastify);
  const containerService = new ContainerService(fastify);
  const sourceFetchService = new SourceFetchService(fastify);
  const buildManager = new BuildManager();

  fastify.decorate('dockerService', dockerService);
  fastify.decorate('containerService', containerService);
  fastify.decorate('sourceFetchService', sourceFetchService);
  fastify.decorate('buildManager', buildManager);
});
