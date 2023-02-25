export const getContainerAllSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          image: { type: 'string' },
        },
        required: ['image'],
      },
    },
  },
} as const;

export const getContainerLogsSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          image: { type: 'string' },
        },
        required: ['image'],
      },
    },
  },
} as const;

export const postContainerNewSchema = {
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
