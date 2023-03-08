import { FromSchema } from 'json-schema-to-ts';
import { postLoginRequestSchema } from '../schema/login-schema';
import { postUserNewRequestSchema } from '../schema/user-schema';
import {
  containerAllResponseSchema,
  getContainerLogsRequestSchema,
  postContainerCreateRequestSchema,
  postContainerCreateResponseSchema
} from '../schema/container-schema';
import { containerSchema } from '../schema/model-schema';

export type PostLoginRequest = FromSchema<typeof postLoginRequestSchema>;
export type PostUserNewRequest = FromSchema<typeof postUserNewRequestSchema>;
export type GetContainerAllResponse = FromSchema<typeof containerAllResponseSchema, { references: [typeof containerSchema] }>;
export type PostCreateContainerRequest = FromSchema<typeof postContainerCreateRequestSchema>;
export type PostCreateContainerResponse = FromSchema<typeof postContainerCreateResponseSchema>;
export type GetContainerLogsRequest = FromSchema<typeof getContainerLogsRequestSchema>;
