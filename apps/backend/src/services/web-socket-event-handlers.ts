import { Socket } from 'socket.io';
import {
  WebSocketContainerLogsSubscribeRequest,
  WebSocketCreateContainerRequest,
  WebSocketMessage,
  WebSocketRequestEvents,
  WebSocketResponseEvents,
} from 'common-src';
import { FastifyInstance } from 'fastify';

export type EventHandler = (fastify: FastifyInstance, socket: Socket, message: WebSocketMessage) => Promise<void>;

// TODO: Think about returning stream from the handler instead of passing socket as an argument
export const webSocketEventHandlers: { [key in WebSocketRequestEvents]: EventHandler } = {
  [WebSocketRequestEvents.ContainerLogsSubscribeRequest]: async (fastify, socket, message) => {
    const castMessage = message as WebSocketContainerLogsSubscribeRequest;
    const logsStream = await fastify.dockerService.containerLogs({
      dbContainerId: castMessage.dbContainerId,
      tail: castMessage.tail,
    });
    logsStream.on('data', (data) => {
      socket.emit('message', {
        event: WebSocketResponseEvents.ContainerLogsResponse,
        text: data.toString(),
      });
    });
  },

  // [WebSocketRequestEvents.InteractiveShellRequest]: async (fastify, socket, message) => {
  //   const castMessage = message as WebSocketInteractiveShellRequest;
  //   socket.emit('message', {
  //     event: WebSocketResponseEvents.InteractiveShellLogs,
  //     text: `requested shell for db container id ${castMessage.dbContainerId}`,
  //   });
  // },

  [WebSocketRequestEvents.CreateContainerRequest]: async (fastify, socket, message) => {
    const castMessage = message as WebSocketCreateContainerRequest;
    const imageName = 'tempimage';
    const containerName = castMessage.containerName ?? 'tempcontainer';
    await fastify.containerService.fetchSourceBuildImageAndCreateContainer({
      ...castMessage,
      imageName,
      containerName,
      socket,
    });
  },
};

export function isNotUndefined(handler?: EventHandler | undefined): handler is EventHandler {
  return handler !== undefined;
}
