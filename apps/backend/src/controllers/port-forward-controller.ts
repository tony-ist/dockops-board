import type { GetPortForwardsQuery, GetPortForwardsResponse, PostPortForwardNewRequest } from 'common-src';
import { getPortForwardsSchema, postPortForwardNewSchema } from 'common-src';
import { PortForward } from 'common-src';
import { FastifyInstance } from 'fastify';
import { serializePortForward } from '../serializers/port-forward-serializers';

export async function portForwardController(fastify: FastifyInstance) {
  fastify.route<{ Querystring: GetPortForwardsQuery; Reply: GetPortForwardsResponse }>({
    method: 'GET',
    url: '/',
    schema: getPortForwardsSchema,
    onRequest: [fastify.authenticate],
    handler: async (request) => {
      const { prisma } = fastify;
      const results = await prisma.portForward.findMany({ where: { dbContainerId: request.query.dbContainerId } });
      return results.map(serializePortForward);
    },
  });

  fastify.route<{ Body: PostPortForwardNewRequest; Reply: PortForward }>({
    method: 'POST',
    url: '/new',
    schema: postPortForwardNewSchema,
    onRequest: [fastify.authenticate],
    handler: async (request) => {
      const { prisma } = fastify;
      const result = await prisma.portForward.create({ data: request.body });
      return serializePortForward(result);
    },
  });
}
