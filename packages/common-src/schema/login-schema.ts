export const loginRequestSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
} as const;

export const postLoginSchema = {
  body: loginRequestSchema,
  response: {
    200: { type: 'string' },
  },
} as const;
