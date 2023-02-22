import fs from 'node:fs';
import fetch from 'node-fetch';
import unzip from 'unzip-stream';
import stream from 'node:stream/promises';
import { FastifyInstance } from 'fastify';
import * as config from '../config';

export const sourceFetchService = {
  async extractZipFromGithub(fastify: FastifyInstance, githubURL: string) {
    const temporaryDirectory = config.temporaryDirectoryPath;

    if (fs.existsSync(temporaryDirectory)) {
      fastify.log.info(`Deleting temporary directory "${temporaryDirectory}"`);
      fs.rmSync(temporaryDirectory, { recursive: true, force: true });
    }

    fastify.log.info(`Creating temporary directory "${temporaryDirectory}"`);
    fs.mkdirSync(temporaryDirectory);

    const githubResponse = await fetch(githubURL);
    const extractStream = unzip.Extract({ path: temporaryDirectory });
    extractStream.on('finish', () => fastify.log.info('Finished extracting downloaded archive.'));

    await stream.pipeline(githubResponse.body, extractStream);
  },
};
