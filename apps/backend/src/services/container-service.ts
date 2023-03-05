import { BuildImageOptions, CreateContainerOptions } from './docker-service';
import { ExtractZipFromGithubOptions } from './source-fetch-service';
import stream from 'node:stream/promises';
import { Socket } from 'socket.io';
import { WebSocketResponseEvents } from 'common-src';
import { FastifyInstance } from 'fastify';

export type FetchSourceBuildImageAndCreateContainerOptions = ExtractZipFromGithubOptions &
  BuildImageOptions &
  CreateContainerOptions & { socket?: Socket };

export class ContainerService {
  fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async fetchSourceBuildImageAndCreateContainer(options: FetchSourceBuildImageAndCreateContainerOptions) {
    const { socket } = options;
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

    const containerDockerId = await fastify.dockerService.createContainer(options);

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
