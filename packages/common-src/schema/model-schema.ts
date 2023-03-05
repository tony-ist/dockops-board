export const containerSchema = {
  $id: 'dockops-board/container',
  title: 'Container',
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
  $id: 'dockops-board/message',
  title: 'Message',
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
  required: ['message'],
  additionalProperties: false,
} as const;

export const logSchema = {
  $id: 'dockops-board/log',
  title: 'Log',
  type: 'object',
  properties: {
    text: { type: 'string' },
  },
  required: ['text'],
  additionalProperties: false,
} as const;

export const dbContainerIdSchema = {
  $id: 'dockops-board/dbContainerId',
  title: 'DbContainerId',
  type: 'object',
  properties: {
    dbContainerId: { type: 'number' },
  },
  required: ['dbContainerId'],
  additionalProperties: false,
} as const;
