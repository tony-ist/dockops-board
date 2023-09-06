import { portForwardNewRequestSchema, portForwardsQuerySchema } from './port-forward-schema';

export const postPortForwardNewSchema = {
  body: portForwardNewRequestSchema,
  response: {
    200: { $ref: 'dockops-board/portForward' },
  },
} as const;

export const getPortForwardsSchema = {
  querystring: portForwardsQuerySchema,
  response: {
    200: { $ref: 'dockops-board/portForwardsResponse' },
  },
} as const;
