import { dbContainerIdSchema } from './model-schema';

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
  $id: 'dockops-board/containerAllRequest',
  title: 'ContainerAllRequest',
  type: 'object',
  additionalProperties: false,
} as const;

export const containerAllResponseSchema = {
  $id: 'dockops-board/containerAllResponse',
  title: 'ContainerAllResponse',
  type: 'array',
  items: { $ref: 'dockops-board/container' },
  // This workaround is due to a bug in OpenAPI generator
  // https://github.com/OpenAPITools/openapi-generator/issues/7802
  properties: {
    length: { type: 'number' },
  },
  additionalProperties: false,
} as const;

export const containerLogsRequestSchema = {
  type: 'object',
  properties: {
    tail: { type: 'number' },
  },
  additionalProperties: false,
} as const;

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
    }
  },
} as const;

export const postContainerCreateSchema = {
  body: containerCreateRequestSchema,
  response: {
    200: { $ref: 'dockops-board/message' },
  },
} as const;

export const postContainerStartSchema = {
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
  querystring: containerLogsRequestSchema,
  response: {
    200: { $ref: 'dockops-board/message' },
  },
} as const;
