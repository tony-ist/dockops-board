import { FromSchema } from 'json-schema-to-ts';
import {
  containerSchema,
  dbContainerIdSchema,
  dbContainerIdStringSchema,
  logSchema,
  messageSchema,
  userSchema
} from '../schema/model-schema';

export type User = FromSchema<typeof userSchema>;
export type Container = FromSchema<typeof containerSchema>;
export type Message = FromSchema<typeof messageSchema>;
export type Log = FromSchema<typeof logSchema>;
export type DbContainerId = FromSchema<typeof dbContainerIdSchema>;
export type DbContainerIdString = FromSchema<typeof dbContainerIdStringSchema>;
