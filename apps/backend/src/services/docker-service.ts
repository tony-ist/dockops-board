import Dockerode, { ContainerCreateOptions } from 'dockerode';
import path from 'path';
import fs from 'node:fs';
import recursiveReadDir from 'recursive-readdir';
import { FastifyInstance } from 'fastify';
import * as config from '../config';

export interface BuildImageOptions {
  fastify: FastifyInstance;
  imageName: string;
  dockerfileName: string;
}

export interface CreateAndRunOptions {
  fastify: FastifyInstance;
  containerName: string;
  imageName: string;
  containerPort?: string;
  hostPort?: string;
}

export type BuildAndRunOptions = BuildImageOptions & CreateAndRunOptions;

interface CreateContainerOptions {
  fastify: FastifyInstance;
  containerName: string;
  imageName: string;
  containerPort?: string;
  hostPort?: string;
}

interface RunContainerOptions {
  fastify: FastifyInstance;
  dbContainerId: number;
}

interface AttachContainerOptions {
  fastify: FastifyInstance;
  dbContainerId: number;
}

interface ContainerLogsOptions {
  fastify: FastifyInstance;
  dbContainerId: number;
  /**
   * How many last lines of logs to return in the stream. If it's undefined, then return 0 last lines.
   */
  tail?: number;
}

export const dockerService = {
  async getAllContainers(docker: Dockerode) {
    const containerInfos = await docker.listContainers({ all: true });
    return containerInfos.map((info) => ({ image: info.Image }));
  },

  async buildImage(options: BuildImageOptions) {
    const { fastify, imageName, dockerfileName } = options;
    const temporaryDirectoryPath = config.temporaryDirectoryPath;
    const docker = fastify.docker;

    const tempFiles = fs.readdirSync(temporaryDirectoryPath);
    const repoDirName = tempFiles[0];

    const repoPath = path.join(temporaryDirectoryPath, repoDirName);
    const repoFiles = await recursiveReadDir(repoPath);
    const relativeRepoFiles = repoFiles.map((f) => path.relative(repoPath, f));

    fastify.log.info(`Building image from repo: ${repoPath}`);

    const dockerignorePath = path.join(repoPath, '.dockerignore');
    // If Dockerfile is in .dockerignore then you will get error "Cannot locate specified Dockerfile: Dockerfile"
    fs.appendFileSync(dockerignorePath, `\n!${dockerfileName}\n`);

    const buildStream = await docker.buildImage(
      {
        context: repoPath,
        src: relativeRepoFiles,
      },
      {
        forcerm: true,
        t: imageName,
        dockerfile: dockerfileName,
      }
    );

    return buildStream;
  },

  /**
   * Creates a docker container in docker and a corresponding entry in the database
   * @returns dockerId of the created docker container (not id from the database)
   */
  async createContainer(options: CreateContainerOptions) {
    const { fastify, containerName, containerPort, hostPort, imageName } = options;
    const { prisma, docker } = fastify;

    const portForwardOptions: Partial<ContainerCreateOptions> = {};
    const shouldPortForward = containerPort !== undefined && hostPort !== undefined;

    if (shouldPortForward) {
      portForwardOptions.HostConfig = {
        PortBindings: {
          [`${containerPort}/tcp`]: [{ HostIp: '0.0.0.0', HostPort: hostPort }],
        },
      };
      portForwardOptions.ExposedPorts = { [`${containerPort}/tcp`]: {} };
    }

    const createContainerOptions = {
      name: containerName,
      Image: imageName,
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      ...portForwardOptions,
    };
    const containerCreateResult = await docker.createContainer(createContainerOptions);
    const containerInspectResult = await containerCreateResult.inspect();

    await prisma.container.create({
      data: {
        dockerId: containerInspectResult.Id,
        image: containerInspectResult.Config.Image,
        dockerName: containerInspectResult.Name,
      },
    });

    return containerCreateResult.id;
  },

  async runContainer(options: RunContainerOptions) {
    const { fastify, dbContainerId } = options;
    const dockerContainer = await dockerService.getDockerContainerByDbContainerId(fastify, dbContainerId);
    const startResult = await dockerContainer.start();

    fastify.log.info(`Started container with id "${dbContainerId}". Additional info: "${startResult.toString()}"`);

    return startResult;
  },

  async attachContainer(options: AttachContainerOptions) {
    const { fastify, dbContainerId } = options;
    const dockerContainer = await dockerService.getDockerContainerByDbContainerId(fastify, dbContainerId);
    const runStream = await dockerContainer.attach({
      stream: true,
      stdout: true,
      stderr: true,
    });
    return runStream;
  },

  /**
   * Attach and listen for container logs
   * @return - readable stream of logs
   */
  async containerLogs(options: ContainerLogsOptions) {
    const { fastify, dbContainerId, tail } = options;
    const dockerContainer = await dockerService.getDockerContainerByDbContainerId(fastify, dbContainerId);

    const logsStream = await dockerContainer.logs({
      timestamps: true,
      stdout: true,
      stderr: true,
      tail: tail ?? 0,
      follow: true,
    });
    return logsStream;
  },

  /**
   * Returns dockerode container instance by container id from the database
   * @param fastify - server instance
   * @param dbContainerId - container id from the database
   */
  async getDockerContainerByDbContainerId(fastify: FastifyInstance, dbContainerId: number) {
    const { prisma, docker } = fastify;
    const dbContainer = await prisma.container.findFirstOrThrow({ where: { id: dbContainerId } });
    const dockerContainer = docker.getContainer(dbContainer.dockerId);
    return dockerContainer;
  },
};
