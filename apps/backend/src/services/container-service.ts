import { BuildImageOptions, CreateContainerOptions, dockerService } from './docker-service';
import { ExtractZipFromGithubOptions, sourceFetchService } from './source-fetch-service';
import stream from 'node:stream/promises';
import { Socket } from 'socket.io';
import { WebSocketResponseEvents } from 'common-src';

export type FetchSourceBuildImageAndCreateContainerOptions =
  ExtractZipFromGithubOptions & BuildImageOptions & CreateContainerOptions & { socket: Socket };

export const containerService = {
  async fetchSourceBuildImageAndCreateContainer(options: FetchSourceBuildImageAndCreateContainerOptions) {
    const { fastify } = options;

    await sourceFetchService.extractZipFromGithub(options);

    const socket = options.socket;
    const buildStream = await dockerService.buildImage(options);
    buildStream.on('data', (data) => {
      const message = data.toString();
      socket.emit('message', {
        event: WebSocketResponseEvents.BuildImageLogs,
        text: data.toString(),
      });
      fastify.log.info(message);
    });

    await stream.finished(buildStream);

    const containerDockerId = await dockerService.createContainer(options);

    const message = `Created container with docker id "${containerDockerId}".`;
    fastify.log.info(message);
    socket.emit('message', {
      event: WebSocketResponseEvents.BuildImageLogs,
      text: message,
    });

    const container = await fastify.prisma.container.findFirstOrThrow({ where: { dockerId: containerDockerId } });

    socket.emit('message', {
      event: WebSocketResponseEvents.CreateContainerResponse,
      container,
    });

    return container;
  },
};
