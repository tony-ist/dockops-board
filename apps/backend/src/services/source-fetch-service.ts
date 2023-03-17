import fs from 'node:fs';
import fetch from 'node-fetch';
import unzip from 'unzip-stream';
import stream from 'node:stream/promises';
import { FastifyInstance } from 'fastify';
import { config } from '../config';

export interface ExtractZipFromGithubOptions {
  githubURL: string;
}

export class SourceFetchService {
  fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async extractZipFromGithub(options: ExtractZipFromGithubOptions) {
    const { githubURL } = options;
    const { fastify } = this;
    const temporaryDirectory = config.temporaryDirectoryPath;

    if (!fs.existsSync(temporaryDirectory)) {
      fastify.log.info(`Creating temporary directory "${temporaryDirectory}"`);
      fs.mkdirSync(temporaryDirectory);
    }

    const githubResponse = await fetch(githubURL);
    const extractStream = unzip.Extract({ path: temporaryDirectory });
    await stream.pipeline(githubResponse.body, extractStream);
  }
}
