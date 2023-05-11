/**
 * This file contains endpoint schema registered in backend/src/controllers
 */

import { dbContainerIdSchema } from './model-schema';
import {
  containerAllResponseSchema,
  containerCreateRequestSchema,
  containerLogsQuerySchema,
  containerWithMessageSchema,
} from './container-schema';

export const getContainerAllSchema = {
  response: {
    200: containerAllResponseSchema,
    401: {
      type: 'object',
      properties: {
        error: { type: 'string' },
        description: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
} as const;

export const getContainerSchema = {
  params: dbContainerIdSchema,
  response: {
    200: { $ref: 'dockops-board/container' },
  },
} as const;

export const postContainerCreateSchema = {
  body: containerCreateRequestSchema,
  response: {
    200: containerWithMessageSchema,
  },
} as const;

export const postContainerStartSchema = {
  params: dbContainerIdSchema,
  response: {
    200: { $ref: 'dockops-board/message' },
  },
} as const;

export const postContainerStopSchema = {
  params: dbContainerIdSchema,
  response: {
    200: { $ref: 'dockops-board/message' },
  },
} as const;

export const postContainerAttachSchema = {
  params: dbContainerIdSchema,
  response: {
    200: { $ref: 'dockops-board/message' },
  },
} as const;

export const getContainerLogsSchema = {
  params: dbContainerIdSchema,
  querystring: containerLogsQuerySchema,
  response: {
    200: { $ref: 'dockops-board/message' },
  },
} as const;
