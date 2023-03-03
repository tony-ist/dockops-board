import { FromSchema } from 'json-schema-to-ts';
import {
  containerAllRequestSchema,
  containerAllResponseSchema,
  containerCreateRequestSchema,
  containerLogsRequestSchema
} from '../schema/container-schema';
import { containerSchema, dbContainerIdSchema, logSchema, messageSchema } from '../schema/model-schema';

export type Message = FromSchema<typeof messageSchema>;
export type Container = FromSchema<typeof containerSchema>;
export type CreateContainerRequest = FromSchema<typeof containerCreateRequestSchema>;
export type RestCreateContainerResponse = Message;
export type ContainerLogsRequest = FromSchema<typeof containerLogsRequestSchema>;
export type Log = FromSchema<typeof logSchema>;
export type ContainerAllRequest = FromSchema<typeof containerAllRequestSchema>;
export type ContainerAllResponse = FromSchema<typeof containerAllResponseSchema>;
export type StartContainerRequest = FromSchema<typeof dbContainerIdSchema>;
export type StartContainerResponse = Message;
