import { FromSchema } from 'json-schema-to-ts';
import { containerSchema } from '../schema/model-schema';
import {
  containerAllResponseSchema,
  containerCreateRequestSchema,
  containerCreateResponseSchema,
  containerLogsQuerySchema
} from '../schema/container-schema';

export type GetContainerAllResponse = FromSchema<typeof containerAllResponseSchema, { references: [typeof containerSchema] }>;
export type PostCreateContainerRequest = FromSchema<typeof containerCreateRequestSchema>;
export type PostCreateContainerResponse = FromSchema<typeof containerCreateResponseSchema, { references: [typeof containerSchema] }>;
export type GetContainerLogsRequest = FromSchema<typeof containerLogsQuerySchema>;
