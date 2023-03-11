import { BuildImageOptions, CreateContainerOptions } from './docker-service';
import { ExtractZipFromGithubOptions } from './source-fetch-service';
import stream from 'node:stream/promises';
import { WebSocketResponseEvents } from 'common-src';
import { FastifyInstance } from 'fastify';
import { DockerState } from '../types/docker-state';
import type { AppSocket } from '../types/app-socket-io-types';
import { serializePrismaContainer } from '../serializers/container-serializers';

export type FetchSourceBuildImageAndCreateContainerOptions = ExtractZipFromGithubOptions &
  BuildImageOptions &
  CreateContainerOptions & { dbContainerId: number; socket?: AppSocket };

export class ContainerService {
  fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async fetchSourceBuildImageAndCreateContainer(options: FetchSourceBuildImageAndCreateContainerOptions) {
    const { socket, dbContainerId } = options;
    const { fastify } = this;

    const startExtractingMessage = 'Start downloading and extracting sources.';
    socket?.emit(WebSocketResponseEvents.BuildImageLogsResponse, {
      dbContainerId,
      text: startExtractingMessage,
    });
    fastify.log.info(startExtractingMessage);

    await fastify.sourceFetchService.extractZipFromGithub(options);

    const finishedExtractingMessage = 'Finished extracting downloaded archive.';
    socket?.emit(WebSocketResponseEvents.BuildImageLogsResponse, {
      dbContainerId,
      text: finishedExtractingMessage,
    });
    fastify.log.info(finishedExtractingMessage);

    const buildStream = await fastify.dockerService.buildImage(options);
    buildStream.on('data', (data) => {
      const message = data.toString();
      socket?.emit(WebSocketResponseEvents.BuildImageLogsResponse, {
        dbContainerId,
        text: data.toString(),
      });
      fastify.log.info(message);
    });

    await stream.finished(buildStream);

    const containerCreateResult = await fastify.dockerService.createContainer(options);
    const containerInspectResult = await containerCreateResult.inspect();
    const containerDockerId = containerInspectResult.Id;

    const dockerName = containerInspectResult.Name.startsWith('/')
      ? containerInspectResult.Name.slice(1)
      : containerInspectResult.Name;

    await fastify.prisma.container.update({
      where: {
        id: dbContainerId,
      },
      data: {
        dockerId: containerDockerId,
        image: containerInspectResult.Config.Image,
        dockerName,
        dockerState: DockerState.Created,
        doesExist: true,
      },
    });

    const container = await fastify.prisma.container.findFirstOrThrow({ where: { dockerId: containerDockerId } });
    const createdContainerMessage = `Created docker container with docker id "${containerDockerId}" and DB id ${container.id}.`;

    fastify.log.info(createdContainerMessage);
    socket?.emit(WebSocketResponseEvents.CreateContainerResponse, {
      message: createdContainerMessage,
      container: serializePrismaContainer(fastify.buildManager, container),
    });

    return container;
  }
}
