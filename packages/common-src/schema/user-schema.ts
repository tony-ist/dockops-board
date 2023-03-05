export const userNewRequestSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    githubToken: { type: 'string' },
  },
  required: ['email', 'password'],
} as const;

export const postUsersNewSchema = {
  body: userNewRequestSchema,
  response: {
    200: { $ref: 'dockops-board/user' },
  },
} as const;
