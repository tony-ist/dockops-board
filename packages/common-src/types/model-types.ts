import { FromSchema } from 'json-schema-to-ts';
import { containerCreateRequestSchema, containerLogsRequestSchema } from '../schema/container-schema';
import { containerSchema, dbContainerIdSchema, logSchema, messageSchema, userSchema } from '../schema/model-schema';
import { userNewRequestSchema } from '../schema/user-schema';
import { loginRequestSchema } from '../schema/login-schema';

export type DbContainerId = FromSchema<typeof dbContainerIdSchema>;
export type Log = FromSchema<typeof logSchema>;
export type Message = FromSchema<typeof messageSchema>;
export type User = FromSchema<typeof userSchema>;

export type LoginRequest = FromSchema<typeof loginRequestSchema>;

export type UserNewRequest = FromSchema<typeof userNewRequestSchema>;

export type CreateContainerRequest = FromSchema<typeof containerCreateRequestSchema>;
export type CreateContainerResponse = { container: FromSchema<typeof containerSchema> };
export type ContainerLogsRequest = FromSchema<typeof containerLogsRequestSchema>;
export type ContainerLogsSubscribeRequest = FromSchema<typeof containerLogsRequestSchema> & DbContainerId;
export type ContainerLogsResponse = Log & DbContainerId;
export type BuildImageLogsResponse = Log & DbContainerId;
