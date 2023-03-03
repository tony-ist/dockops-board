export const containerSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    dockerId: { type: 'string' },
    image: { type: 'string' },
  },
  required: ['id', 'dockerId', 'image'],
  additionalProperties: false,
} as const;

export const messageSchema = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
  required: ['message'],
  additionalProperties: false,
} as const;

export const logSchema = {
  type: 'object',
  properties: {
    text: { type: 'string' },
  },
  required: ['text'],
  additionalProperties: false,
} as const;

export const dbContainerIdSchema = {
  type: 'object',
  properties: {
    dbContainerId: { type: 'number' },
  },
  required: ['dbContainerId'],
  additionalProperties: false,
} as const;