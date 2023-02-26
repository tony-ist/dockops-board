import fs from 'node:fs';
import fetch from 'node-fetch';
import unzip from 'unzip-stream';
import stream from 'node:stream/promises';
import { FastifyInstance } from 'fastify';
import * as config from '../config';

export interface ExtractZipFromGithubOptions {
  fastify: FastifyInstance;
  githubURL: string;
}

export const sourceFetchService = {
  async extractZipFromGithub(options: ExtractZipFromGithubOptions) {
    const { fastify, githubURL } = options;
    const temporaryDirectory = config.temporaryDirectoryPath;

    fastify.log.info(`Creating temporary directory "${temporaryDirectory}"`);
    fs.mkdirSync(temporaryDirectory);

    const githubResponse = await fetch(githubURL);
    const extractStream = unzip.Extract({ path: temporaryDirectory });
    extractStream.on('finish', () => {
      const socket = fastify.socketManager.get();
      const message = 'Finished extracting downloaded archive.';
      if (socket) {
        socket.emit('message', message);
      }
      fastify.log.info(message);
    });

    await stream.pipeline(githubResponse.body, extractStream);
  },
};
