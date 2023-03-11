import { EventHandler, isNotUndefined, webSocketEventHandlers } from './web-socket-event-handlers';
import { WebSocketRequestEvents, WebSocketResponseEvents, WSRequestMessage } from 'common-src';
import { FastifyInstance } from 'fastify';
import type { AppSocket } from '../types/app-socket-io-types';

const errorResponseEventsByRequestEvents: { [key in WebSocketRequestEvents]: WebSocketResponseEvents } = {
  [WebSocketRequestEvents.ContainerLogsSubscribeRequest]: WebSocketResponseEvents.ContainerLogsResponse,
  [WebSocketRequestEvents.CreateContainerRequest]: WebSocketResponseEvents.CreateContainerResponse,
};

export const webSocketConnectionHandler = (fastify: FastifyInstance, socket: AppSocket) => {
  (Object.keys(WebSocketRequestEvents) as Array<keyof typeof WebSocketRequestEvents>).forEach((requestEvent) => {
    socket.on(WebSocketRequestEvents[requestEvent], async (message: WSRequestMessage<unknown>) => {
      try {
        const handler: EventHandler | undefined = webSocketEventHandlers[requestEvent];

        if (isNotUndefined(handler)) {
          await handler({ fastify, socket, message });
        } else {
          throw new Error(`No handler for event ${requestEvent} for web socket message ${message}.`);
        }
      } catch (error) {
        const errorMessage = (error as Error).message;
        fastify.log.error(errorMessage);
        socket.emit(errorResponseEventsByRequestEvents[requestEvent], { error: errorMessage });
      }
    });
  });

  fastify.log.info(`Socket connection established: ${socket.id}`);
  fastify.socketManager.set(socket);
};
