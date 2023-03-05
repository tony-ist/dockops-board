import { FromSchema } from 'json-schema-to-ts';
import { containerCreateRequestSchema, containerLogsRequestSchema } from '../schema/container-schema';
import { containerSchema, dbContainerIdSchema, logSchema } from '../schema/model-schema';

export type DbContainerId = FromSchema<typeof dbContainerIdSchema>;
export type Log = FromSchema<typeof logSchema>;

export type CreateContainerRequest = FromSchema<typeof containerCreateRequestSchema>;
export type CreateContainerResponse = { container: FromSchema<typeof containerSchema> };
export type ContainerLogsSubscribeRequest = FromSchema<typeof containerLogsRequestSchema> & DbContainerId;
export type ContainerLogsResponse = Log & DbContainerId;
export type BuildImageLogsResponse = Log & DbContainerId;
