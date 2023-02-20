export const getContainerAllSchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          image: { type: 'string' },
        },
      },
    },
  },
} as const;
