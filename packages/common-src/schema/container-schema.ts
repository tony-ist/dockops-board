/**
 * This files contains intermediary schemas used to generate types in common-src/types
 */

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

export const containerLogsQuerySchema = {
  type: 'object',
  properties: {
    tail: { type: 'number' },
  },
  additionalProperties: false,
} as const;

export const containerWithMessageSchema = {
  type: 'object',
  properties: {
    container: { $ref: 'dockops-board/container' },
    message: { type: 'string' },
  },
  required: ['container', 'message'],
  additionalProperties: false,
} as const;
