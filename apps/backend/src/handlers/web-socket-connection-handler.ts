import { Socket } from 'socket.io';
import { EventHandler, isNotUndefined, webSocketEventHandlers } from './web-socket-event-handlers';
import { WebSocketMessage, WebSocketRequestEvents, WebSocketResponseEvents } from 'common-src';
import { FastifyInstance } from 'fastify';
import { authenticate } from '../utils/authenticate-utils';

export const webSocketConnectionHandler = (fastify: FastifyInstance, socket: Socket) => {
  socket.on('message', async (message: WebSocketMessage) => {
    try {
      if (message.jwtToken === undefined) {
        throw new Error(`Missing jwtToken field in web socket message body. Socket id: "${socket.id}".`);
      }

      const user = await authenticate(fastify, message.jwtToken);

      const handler: EventHandler | undefined = webSocketEventHandlers[message.event as WebSocketRequestEvents];

      if (isNotUndefined(handler)) {
        await handler({ fastify, socket, message, user });
      } else {
        throw new Error(`Unrecognized websocket event "${message.event}".`);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      fastify.log.error(errorMessage);
      socket.emit('message', { event: WebSocketResponseEvents.ErrorResponse, error: errorMessage });
    }
  });

  fastify.log.info(`Socket connection established: ${socket.id}`);
  fastify.socketManager.set(socket);
};
