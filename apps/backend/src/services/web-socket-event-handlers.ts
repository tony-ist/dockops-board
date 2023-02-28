import { Socket } from 'socket.io';
import { dockerService } from './docker-service';
import { server } from '../server';
import { WebSocketMessage, WebSocketRequest, WebSocketResponse } from 'common-src';

export type EventHandler = (socket: Socket, message: WebSocketMessage) => Promise<void>;

export const webSocketEventHandlers: { [key in WebSocketRequest]: EventHandler } = {
  [WebSocketRequest.ContainerLogsRequest]: async (socket, message) => {
    const logsStream = await dockerService.containerLogs({
      fastify: server,
      // TODO: Get rid of "as number", make message type-safe
      dbContainerId: message.dbContainerId as number,
      tail: message.tail,
    });
    logsStream.on('data', (data) => {
      socket.emit('message', {
        event: WebSocketResponse.ContainerLogsResponse,
        text: data.toString(),
      });
    });
  },
  [WebSocketRequest.InteractiveShellRequest]: async (socket, message) => {
    socket.emit('message', {
      event: WebSocketResponse.InteractiveShellResponse,
      text: message.command,
    });
  },
};

export function isNotUndefined(handler?: EventHandler | undefined): handler is EventHandler {
  return handler !== undefined;
}
