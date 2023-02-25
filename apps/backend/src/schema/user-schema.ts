export const postUsersNewSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        password: { type: 'string' },
        githubToken: { type: ['string', 'null'] },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
  },
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      githubToken: { type: 'string' },
    },
    required: ['email', 'password'],
  },
} as const;
