import { FromSchema } from 'json-schema-to-ts';
import { containerSchema } from '../schema/model-schema';
import {
  containerAllResponseSchema,
  containerCreateRequestSchema,
  containerWithMessageSchema,
  containerLogsQuerySchema,
} from '../schema/container-schema';

export type GetContainerAllResponse = FromSchema<
  typeof containerAllResponseSchema,
  { references: [typeof containerSchema] }
>;
export type PostCreateContainerRequest = FromSchema<typeof containerCreateRequestSchema>;
export type ContainerWithMessageSchema = FromSchema<
  typeof containerWithMessageSchema,
  { references: [typeof containerSchema] }
>;
export type GetContainerLogsRequest = FromSchema<typeof containerLogsQuerySchema>;
