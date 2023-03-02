import { BuildImageOptions, CreateContainerOptions, dockerService } from './docker-service';
import { ExtractZipFromGithubOptions, sourceFetchService } from './source-fetch-service';
import stream from 'node:stream/promises';
import { Socket } from 'socket.io';
import { WebSocketResponseEvents } from 'common-src';

export type FetchSourceBuildImageAndCreateContainerOptions =
  ExtractZipFromGithubOptions & BuildImageOptions & CreateContainerOptions & { socket?: Socket };

export const containerService = {
  async fetchSourceBuildImageAndCreateContainer(options: FetchSourceBuildImageAndCreateContainerOptions) {
    const { fastify, socket } = options;

    const startExtractingMessage = 'Start downloading and extracting sources.';
    socket?.emit('message', {
      event: WebSocketResponseEvents.BuildImageLogs,
      text: startExtractingMessage,
    });
    fastify.log.info(startExtractingMessage);

    await sourceFetchService.extractZipFromGithub(options);

    const finishedExtractingMessage = 'Finished extracting downloaded archive.';
    socket?.emit('message', {
      event: WebSocketResponseEvents.BuildImageLogs,
      text: finishedExtractingMessage,
    });
    fastify.log.info(finishedExtractingMessage);

    const buildStream = await dockerService.buildImage(options);
    buildStream.on('data', (data) => {
      const message = data.toString();
      socket?.emit('message', {
        event: WebSocketResponseEvents.BuildImageLogs,
        text: data.toString(),
      });
      fastify.log.info(message);
    });

    await stream.finished(buildStream);

    const containerDockerId = await dockerService.createContainer(options);

    const createdContainerMessage = `Created container with docker id "${containerDockerId}".`;
    fastify.log.info(createdContainerMessage);
    socket?.emit('message', {
      event: WebSocketResponseEvents.BuildImageLogs,
      text: createdContainerMessage,
    });

    const container = await fastify.prisma.container.findFirstOrThrow({ where: { dockerId: containerDockerId } });

    socket?.emit('message', {
      event: WebSocketResponseEvents.CreateContainerResponse,
      container,
    });

    return container;
  },
};
