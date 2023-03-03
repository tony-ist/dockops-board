import { containerSchema, dbContainerIdSchema, messageSchema } from './model-schema';

export const containerCreateRequestSchema = {
  type: 'object',
  properties: {
    containerName: { type: 'string' },
    githubURL: { type: 'string' },
    dockerfileName: { type: 'string' },
    hostPort: { type: 'string' },
    containerPort: { type: 'string' },
  },
  required: ['containerName', 'githubURL'],
} as const;

export const containerAllRequestSchema = {
  type: 'object',
} as const;

export const containerAllResponseSchema = {
  type: 'array',
  items: containerSchema,
} as const;

export const containerLogsRequestSchema = {
  type: 'object',
  properties: {
    dbContainerId: { type: 'number' },
    tail: { type: 'number' },
  },
  required: ['dbContainerId'],
  additionalProperties: false,
} as const;

export const getContainerAllSchema = {
  response: {
    200: containerAllResponseSchema,
  },
} as const;

export const postContainerCreateSchema = {
  body: containerCreateRequestSchema,
  response: {
    200: messageSchema,
  },
} as const;

export const postContainerStartSchema = {
  params: dbContainerIdSchema,
  response: {
    200: messageSchema,
  },
} as const;

export const postContainerAttachSchema = {
  params: dbContainerIdSchema,
  response: {
    200: messageSchema,
  },
} as const;

export const getContainerLogsSchema = {
  params: dbContainerIdSchema,
  querystring: containerLogsRequestSchema,
  response: {
    200: messageSchema,
  },
} as const;
