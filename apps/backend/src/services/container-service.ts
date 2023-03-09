import { BuildImageOptions, CreateContainerOptions } from './docker-service';
import { ExtractZipFromGithubOptions } from './source-fetch-service';
import stream from 'node:stream/promises';
import { Socket } from 'socket.io';
import { WebSocketResponseEvents } from 'common-src';
import { FastifyInstance } from 'fastify';
import { DockerState } from '../types/docker-state';

export type FetchSourceBuildImageAndCreateContainerOptions = ExtractZipFromGithubOptions &
  BuildImageOptions &
  CreateContainerOptions & { dbContainerId: number; socket?: Socket };

export class ContainerService {
  fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async fetchSourceBuildImageAndCreateContainer(options: FetchSourceBuildImageAndCreateContainerOptions) {
    const { socket, dbContainerId } = options;
    const { fastify } = this;

    const startExtractingMessage = 'Start downloading and extracting sources.';
    socket?.emit('message', {
      event: WebSocketResponseEvents.BuildImageLogsResponse,
      text: startExtractingMessage,
    });
    fastify.log.info(startExtractingMessage);

    await fastify.sourceFetchService.extractZipFromGithub(options);

    const finishedExtractingMessage = 'Finished extracting downloaded archive.';
    socket?.emit('message', {
      event: WebSocketResponseEvents.BuildImageLogsResponse,
      text: finishedExtractingMessage,
    });
    fastify.log.info(finishedExtractingMessage);

    const buildStream = await fastify.dockerService.buildImage(options);
    buildStream.on('data', (data) => {
      const message = data.toString();
      socket?.emit('message', {
        event: WebSocketResponseEvents.BuildImageLogsResponse,
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

    const createdContainerMessage = `Created container with docker id "${containerDockerId}".`;
    fastify.log.info(createdContainerMessage);
    socket?.emit('message', {
      event: WebSocketResponseEvents.BuildImageLogsResponse,
      text: createdContainerMessage,
    });

    const container = await fastify.prisma.container.findFirstOrThrow({ where: { dockerId: containerDockerId } });

    socket?.emit('message', {
      event: WebSocketResponseEvents.CreateContainerResponse,
      container,
    });

    return container;
  }
}
