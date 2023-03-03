export const containerSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    dockerId: { type: 'string' },
    image: { type: 'string' },
  },
  required: ['id', 'dockerId', 'image'],
  additionalProperties: false,
} as const;

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

export const messageSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
  required: ['message'],
  additionalProperties: false,
} as const;

export const logSchema = {
  type: 'object',
  properties: {
    text: { type: 'string' },
  },
  required: ['text'],
} as const;

export const containerLogsRequestSchema = {
  type: 'object',
  properties: {
    tail: { type: 'number' },
  },
} as const;

const containerIdParams = {
  type: 'object',
  properties: {
    containerId: { type: 'number' },
  },
};

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
  params: containerIdParams,
  response: {
    200: messageSchema,
  },
} as const;

export const postContainerAttachSchema = {
  params: containerIdParams,
  response: {
    200: messageSchema,
  },
} as const;

export const getContainerLogsSchema = {
  params: containerIdParams,
  querystring: containerLogsRequestSchema,
  response: {
    200: messageSchema,
  },
} as const;
