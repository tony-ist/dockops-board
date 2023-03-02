import { Socket } from 'socket.io';
import { dockerService } from './docker-service';
import { server } from '../server';
import {
  WebSocketContainerLogsRequest,
  WebSocketCreateContainerRequest,
  WebSocketInteractiveShellRequest,
  WebSocketMessage,
  WebSocketRequestEvents,
  WebSocketResponseEvents,
} from 'common-src';
import { FastifyInstance } from 'fastify';
import { containerService } from './container-service';

export type EventHandler = (fastify: FastifyInstance, socket: Socket, message: WebSocketMessage) => Promise<void>;

// TODO: Think about returning stream from the handler instead of passing socket as an argument
export const webSocketEventHandlers: { [key in WebSocketRequestEvents]: EventHandler } = {
  [WebSocketRequestEvents.ContainerLogsSubscribe]: async (fastify, socket, message) => {
    const castMessage = message as WebSocketContainerLogsRequest;
    const logsStream = await dockerService.containerLogs({
      fastify: server,
      dbContainerId: castMessage.dbContainerId,
      tail: castMessage.tail,
    });
    logsStream.on('data', (data) => {
      socket.emit('message', {
        event: WebSocketResponseEvents.ContainerLogs,
        text: data.toString(),
      });
    });
  },

  [WebSocketRequestEvents.InteractiveShellRequest]: async (fastify, socket, message) => {
    const castMessage = message as WebSocketInteractiveShellRequest;
    socket.emit('message', {
      event: WebSocketResponseEvents.InteractiveShellLogs,
      text: `requested shell for db container id ${castMessage.dbContainerId}`,
    });
  },

  [WebSocketRequestEvents.CreateContainerRequest]: async (fastify, socket, message) => {
    const castMessage = message as WebSocketCreateContainerRequest;
    const imageName = 'tempimage';
    const containerName = castMessage.containerName ?? 'tempcontainer';
    await containerService.fetchSourceBuildImageAndCreateContainer(
      { fastify, ...castMessage, imageName, containerName, socket }
    );
  },
};

export function isNotUndefined(handler?: EventHandler | undefined): handler is EventHandler {
  return handler !== undefined;
}
