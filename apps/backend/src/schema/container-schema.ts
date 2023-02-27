const containerIdParams = {
  type: 'object',
  properties: {
    containerId: { type: 'number' },
  },
};

export const getContainerAllSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          dockerId: { type: 'string' },
          image: { type: 'string' },
        },
        required: ['id', 'dockerId', 'image'],
      },
    },
  },
} as const;

export const postContainerCreateSchema = {
  body: {
    type: 'object',
    properties: {
      containerName: { type: 'string' },
      githubURL: { type: 'string' },
      dockerfileName: { type: 'string' },
      hostPort: { type: 'string' },
      containerPort: { type: 'string' },
    },
    required: ['containerName', 'githubURL'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
} as const;

export const postContainerStartSchema = {
  params: containerIdParams,
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
} as const;

export const postContainerAttachSchema = {
  params: containerIdParams,
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
} as const;

export const getContainerLogsSchema = {
  params: containerIdParams,
  querystring: {
    type: 'object',
    properties: {
      tail: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
} as const;
