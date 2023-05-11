import { AppSocket } from '../types/app-socket-io-types';
import { authenticate } from '../utils/authenticate-utils';
import { FastifyInstance } from 'fastify';

export function registerSocketIOMiddleware(fastify: FastifyInstance) {
  fastify.io.use((socket: AppSocket, next) => {
    const jwtToken = socket.handshake.auth.token;

    if (!jwtToken) {
      return next(new Error('No jwtToken provided during websocket authentication.'));
    }

    authenticate(fastify, jwtToken)
      .then((userId: number) => {
        socket.data.userId = userId;
        return next();
      })
      .catch((error) => {
        fastify.log.debug(`WebSocket auth error: "${error}". Socket id: "${socket.id}"`);
        return next(new Error(`AuthorizationError ${error}`));
      });
  });
}
