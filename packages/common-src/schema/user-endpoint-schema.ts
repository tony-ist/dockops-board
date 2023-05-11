import { userNewRequestSchema } from './user-schema';

export const postUsersNewSchema = {
  body: userNewRequestSchema,
  response: {
    200: { $ref: 'dockops-board/user' },
  },
} as const;
