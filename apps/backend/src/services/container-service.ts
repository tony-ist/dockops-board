import { BuildImageOptions, CreateAndRunOptions, dockerService } from './docker-service';
import { sourceFetchService } from './source-fetch-service';

export type FetchSourceBuildImageAndRunContainerOptions = BuildImageOptions &
  CreateAndRunOptions & { githubURL: string };

export const containerService = {
  async fetchSourceBuildImageAndRunContainer(options: FetchSourceBuildImageAndRunContainerOptions) {
    const { fastify, githubURL, imageName, containerPort, hostPort, dockerfileName, containerName } = options;
    await sourceFetchService.extractZipFromGithub({ fastify, githubURL });
    return await dockerService.buildAndRun({
      fastify,
      imageName,
      containerName,
      containerPort,
      hostPort,
      dockerfileName,
    });
  },
};
