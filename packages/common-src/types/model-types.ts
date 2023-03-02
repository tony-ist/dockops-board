import { FromSchema } from 'json-schema-to-ts';
import { containerSchema } from '../schema/container-schema';

export type Container = FromSchema<typeof containerSchema>;
