import { FromSchema } from 'json-schema-to-ts';
import { userNewRequestSchema } from '../schema/user-schema';

export type PostUserNewRequest = FromSchema<typeof userNewRequestSchema>;
