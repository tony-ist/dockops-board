import Fastify from 'fastify';
import * as config from './config';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

function getLoggerOptions(environment: string) {
  if (environment === 'PRODUCTION') {
    return true;
  } else if (environment === 'DEVELOPMENT') {
    return {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    };
  } else {
    return true;
  }
}

export const server = Fastify({ logger: getLoggerOptions(config.nodeEnv) }).withTypeProvider<JsonSchemaToTsProvider>();
