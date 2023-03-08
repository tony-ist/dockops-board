import Dockerode, { ContainerCreateOptions } from 'dockerode';
import path from 'path';
import fs from 'node:fs';
import recursiveReadDir from 'recursive-readdir';
import { FastifyInstance } from 'fastify';
import * as config from '../config';

export interface BuildImageOptions {
  imageName: string;
  dockerfileName?: string;
}

export interface CreateContainerOptions {
  containerName: string;
  imageName: string;
  containerPort?: string;
  hostPort?: string;
}

interface RunContainerOptions {
  dbContainerId: number;
}

interface AttachContainerOptions {
  dbContainerId: number;
}

interface ContainerLogsOptions {
  dbContainerId: number;
  /**
   * How many last lines of logs to return in the stream. If it's undefined, then return 0 last lines.
   */
  tail?: number;
}

export class DockerService {
  fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async getAllContainers(docker: Dockerode) {
    const containerInfos = await docker.listContainers({ all: true });
    return containerInfos.map((info) => ({ image: info.Image }));
  }

  async buildImage(options: BuildImageOptions) {
    const { imageName, dockerfileName } = options;
    const { fastify } = this;
    const temporaryDirectoryPath = config.temporaryDirectoryPath;
    const docker = fastify.docker;
    const dockerfile = dockerfileName ?? 'Dockerfile';

    const tempFiles = fs.readdirSync(temporaryDirectoryPath);
    const repoDirName = tempFiles[0];

    const repoPath = path.join(temporaryDirectoryPath, repoDirName);
    const repoFiles = await recursiveReadDir(repoPath);
    const relativeRepoFiles = repoFiles.map((f) => path.relative(repoPath, f));

    fastify.log.info(`Building image from repo: ${repoPath}`);

    const dockerignorePath = path.join(repoPath, '.dockerignore');
    // If Dockerfile is in .dockerignore then you will get error "Cannot locate specified Dockerfile: Dockerfile"
    fs.appendFileSync(dockerignorePath, `\n!${dockerfile}\n`);

    const buildStream = await docker.buildImage(
      {
        context: repoPath,
        src: relativeRepoFiles,
      },
      {
        forcerm: true,
        t: imageName,
        dockerfile,
      }
    );

    return buildStream;
  }

  /**
   * Creates a docker container in docker and a corresponding entry in the database
   * @returns dockerId of the created docker container (not id from the database)
   */
  async createContainer(options: CreateContainerOptions) {
    const { containerName, containerPort, hostPort, imageName } = options;
    const { fastify } = this;
    const { docker } = fastify;

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

    const createContainerResult = await docker.createContainer(createContainerOptions);

    return createContainerResult;
  }

  async startContainer(options: RunContainerOptions) {
    const { dbContainerId } = options;
    const { fastify } = this;
    const dockerContainer = await this.getDockerContainerByDbContainerId(dbContainerId);
    const startResult = await dockerContainer.start();

    fastify.log.info(`Started container with id "${dbContainerId}". Additional info: "${startResult.toString()}"`);

    return startResult;
  }

  async stopContainer(options: RunContainerOptions) {
    const { dbContainerId } = options;
    const { fastify } = this;
    const dockerContainer = await this.getDockerContainerByDbContainerId(dbContainerId);
    const stopResult = await dockerContainer.stop();

    fastify.log.info(`Stopped container with id "${dbContainerId}". Additional info: "${stopResult.toString()}"`);

    return stopResult;
  }

  async attachContainer(options: AttachContainerOptions) {
    const { dbContainerId } = options;
    const dockerContainer = await this.getDockerContainerByDbContainerId(dbContainerId);
    const runStream = await dockerContainer.attach({
      stream: true,
      stdout: true,
      stderr: true,
    });
    return runStream;
  }

  /**
   * Attach and listen for container logs
   * @return - readable stream of logs
   */
  async containerLogs(options: ContainerLogsOptions) {
    const { dbContainerId, tail } = options;
    const dockerContainer = await this.getDockerContainerByDbContainerId(dbContainerId);

    const logsStream = await dockerContainer.logs({
      timestamps: true,
      stdout: true,
      stderr: true,
      tail: tail ?? 0,
      follow: true,
    });
    return logsStream;
  }

  /**
   * Returns dockerode container instance by container id from the database
   * @param dbContainerId - container id from the database
   */
  async getDockerContainerByDbContainerId(dbContainerId: number) {
    const { fastify } = this;
    const { prisma, docker } = fastify;
    const dbContainer = await prisma.container.findFirstOrThrow({ where: { id: dbContainerId } });

    if (!dbContainer.dockerId) {
      throw new Error(`dbContainer.dockerId is "${dbContainer.dockerId}" for db container with id "${dbContainerId}".`);
    }

    const dockerContainer = docker.getContainer(dbContainer.dockerId);
    return dockerContainer;
  }
}
