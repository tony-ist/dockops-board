export const portForwardNewRequestSchema = {
  type: 'object',
  properties: {
    dbContainerId: { type: 'number' },
    hostPort: { type: 'string' },
    containerPort: { type: 'string' },
  },
  required: ['dbContainerId', 'hostPort', 'containerPort'],
  additionalProperties: false,
} as const;

export const portForwardsQuerySchema = {
  type: 'object',
  properties: {
    dbContainerId: { type: 'number' },
  },
  additionalProperties: false,
} as const;

export const portForwardsResponseSchema = {
  $id: 'dockops-board/portForwardsResponse',
  title: 'PortForwards',
  type: 'array',
  items: { $ref: 'dockops-board/portForward' },
  properties: {
    length: { type: 'number' },
  },
  additionalProperties: false,
} as const;
