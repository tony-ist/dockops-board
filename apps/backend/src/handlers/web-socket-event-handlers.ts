import {
  WebSocketRequestEvents,
  WebSocketResponseEvents,
  WSContainerLogsSubscribeRequestMessage,
  WSCreateContainerRequestMessage,
  WSRequestMessage,
} from 'common-src';
import { FastifyInstance } from 'fastify';
import type { AppSocket } from '../types/app-socket-io-types';

export interface EventHandlerOptions {
  fastify: FastifyInstance;
  socket: AppSocket;
  message: WSRequestMessage<unknown>;
}

export type EventHandler = (options: EventHandlerOptions) => Promise<void>;

// TODO: Think about returning stream from the handler instead of passing socket as an argument
export const webSocketEventHandlers: { [key in WebSocketRequestEvents]: EventHandler } = {
  [WebSocketRequestEvents.ContainerLogsSubscribeRequest]: async (options) => {
    const { fastify, socket, message } = options;
    const castMessage = message as WSContainerLogsSubscribeRequestMessage;
    const { dbContainerId, tail } = castMessage;
    const logsStream = await fastify.dockerService.listenContainerLogs({
      dbContainerId,
      tail,
    });
    logsStream.on('data', (data) => {
      socket.emit(WebSocketResponseEvents.ContainerLogsResponse, {
        dbContainerId,
        text: data.toString(),
      });
    });
  },

  [WebSocketRequestEvents.CreateContainerRequest]: async (options) => {
    const { fastify, socket, message } = options;
    const castMessage = message as WSCreateContainerRequestMessage;
    const imageName = 'tempimage';
    const containerName = castMessage.containerName || 'tempcontainer';
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
      if (error instanceof Error) {
        socket.emit(WebSocketResponseEvents.CreateContainerResponse, {
          error: error.message,
        });
      }
      fastify.buildManager.set(container.id, 'error');
      throw error;
    }
    fastify.buildManager.set(container.id, 'success');
  },
};

export function isNotUndefined(handler?: EventHandler | undefined): handler is EventHandler {
  return handler !== undefined;
}
