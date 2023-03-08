import { loginRequestSchema } from './login-schema';

export const postLoginSchema = {
  body: loginRequestSchema,
  response: {
    200: { type: 'string' },
  },
} as const;