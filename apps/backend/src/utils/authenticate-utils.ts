import { FastifyInstance } from 'fastify';
import { JwtToken } from '../types/jwt-token';

export async function authenticate(fastify: FastifyInstance, jwtToken: string) {
  const verificationResult = await fastify.jwt.verify<JwtToken>(jwtToken);
  const { userId } = verificationResult;
  // TODO: Think about not returning user
  return await fastify.prisma.user.findFirstOrThrow({ where: { id: userId } });
}
