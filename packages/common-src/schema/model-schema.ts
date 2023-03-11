/**
 * This file contains openapi models registered in backend/src/index.ts with server.addSchema method
 */

export const userSchema = {
  $id: 'dockops-board/user',
  title: 'User',
  type: 'object',
  properties: {
    id: { type: 'number' },
    email: { type: 'string' },
    githubToken: { type: ['string', 'null'] },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['id', 'email'],
  additionalProperties: false,
} as const;

export const containerSchema = {
  $id: 'dockops-board/container',
  title: 'Container',
  type: 'object',
  properties: {
    id: { type: 'number' },
    image: { type: 'string' },
    dockerId: { type: 'string' },
    dockerName: { type: 'string' },
    dockerState: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    buildStatus: { type: 'string' },
  },
  required: ['id', 'dockerName'],
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

// TODO: Make this schema intermediary instead
export const dbContainerIdStringSchema = {
  $id: 'dockops-board/dbContainerIdString',
  title: 'DbContainerIdString',
  type: 'object',
  properties: {
    dbContainerId: { type: 'string' },
  },
  required: ['dbContainerId'],
  additionalProperties: false,
} as const;

