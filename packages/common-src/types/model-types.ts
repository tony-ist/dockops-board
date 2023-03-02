import { FromSchema } from 'json-schema-to-ts';
import {
  containerAllRequestSchema,
  containerAllResponseSchema,
  containerCreateRequestSchema,
  containerSchema,
  logSchema,
  messageSchema
} from '../schema/container-schema';

export type Message = FromSchema<typeof messageSchema>;
export type Container = FromSchema<typeof containerSchema>;
export type CreateContainerRequest = FromSchema<typeof containerCreateRequestSchema>;
export type CreateContainerResponse = Message;
export type Log = FromSchema<typeof logSchema>;
export type ContainerAllRequest = FromSchema<typeof containerAllRequestSchema>;
export type ContainerAllResponse = FromSchema<typeof containerAllResponseSchema>;
