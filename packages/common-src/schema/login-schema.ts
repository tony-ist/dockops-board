export const postLoginRequestSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
} as const;

export const postLoginSchema = {
  body: postLoginRequestSchema,
  response: {
    200: { type: 'string' },
  },
} as const;
