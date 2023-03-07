import { Socket } from 'socket.io';
import {
  WebSocketContainerLogsSubscribeRequest,
  WebSocketCreateContainerRequest,
  WebSocketMessage,
  WebSocketRequestEvents,
  WebSocketResponseEvents,
} from 'common-src';
import { FastifyInstance } from 'fastify';
import { User } from '@prisma/client';

export interface EventHandlerOptions {
  fastify: FastifyInstance;
  socket: Socket;
  message: WebSocketMessage;
  user: User;
}

export type EventHandler = (options: EventHandlerOptions) => Promise<void>;

// TODO: Think about returning stream from the handler instead of passing socket as an argument
export const webSocketEventHandlers: { [key in WebSocketRequestEvents]: EventHandler } = {
  [WebSocketRequestEvents.ContainerLogsSubscribeRequest]: async (options) => {
    const { fastify, socket, message } = options;
    const castMessage = message as WebSocketContainerLogsSubscribeRequest;
    const logsStream = await fastify.dockerService.containerLogs({
      dbContainerId: parseInt(castMessage.dbContainerId),
      tail: castMessage.tail,
    });
    logsStream.on('data', (data) => {
      socket.emit('message', {
        event: WebSocketResponseEvents.ContainerLogsResponse,
        text: data.toString(),
      });
    });
  },

  [WebSocketRequestEvents.CreateContainerRequest]: async (options) => {
    const { fastify, socket, message } = options;
    const castMessage = message as WebSocketCreateContainerRequest;
    const imageName = 'tempimage';
    const containerName = castMessage.containerName ?? 'tempcontainer';
    const container = await fastify.prisma.container.create({
      data: {
        dockerName: containerName,
        doesExist: false,
      },
    });
    fastify.buildManager.set(container.id, 'building');
    try {
      await fastify.containerService.fetchSourceBuildImageAndCreateContainer({
        ...castMessage,
        dbContainerId: container.id,
        imageName,
        containerName,
        socket,
      });
    } catch (error) {
      fastify.buildManager.set(container.id, 'error');
      throw error;
    }
    fastify.buildManager.set(container.id, 'success');
  },
};

export function isNotUndefined(handler?: EventHandler | undefined): handler is EventHandler {
  return handler !== undefined;
}
