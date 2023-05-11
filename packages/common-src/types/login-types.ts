import { FromSchema } from 'json-schema-to-ts';
import { loginRequestSchema } from '../schema/login-schema';

export type PostLoginRequest = FromSchema<typeof loginRequestSchema>;
