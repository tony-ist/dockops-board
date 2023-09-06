import { FromSchema } from 'json-schema-to-ts';
import {
  portForwardsResponseSchema,
  portForwardNewRequestSchema,
  portForwardsQuerySchema,
} from '../schema/port-forward-schema';
import { portForwardSchema } from '../schema/model-schema';

export type GetPortForwardsQuery = FromSchema<typeof portForwardsQuerySchema>;
export type GetPortForwardsResponse = FromSchema<
  typeof portForwardsResponseSchema,
  { references: [typeof portForwardSchema] }
>;
export type PostPortForwardNewRequest = FromSchema<typeof portForwardNewRequestSchema>;
