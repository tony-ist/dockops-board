import { BuildImageOptions, CreateAndRunOptions, dockerService } from './docker-service';
import { sourceFetchService } from './source-fetch-service';
import stream from 'node:stream/promises';

export type FetchSourceBuildImageAndRunContainerOptions = BuildImageOptions &
  CreateAndRunOptions & { githubURL: string };

export const containerService = {
  async fetchSourceBuildImageAndCreateContainer(options: FetchSourceBuildImageAndRunContainerOptions) {
    const { fastify } = options;

    await sourceFetchService.extractZipFromGithub(options);

    const socket = fastify.socketManager.get();
    const buildStream = await dockerService.buildImage(options);
    buildStream.on('data', (data) => {
      const message = data.toString();
      if (socket !== null) {
        socket.emit('message', message);
      }
      fastify.log.info(message);
    });

    await stream.finished(buildStream);

    return await dockerService.createContainer(options);
  },
};
