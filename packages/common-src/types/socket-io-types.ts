import {
  WebSocketRequestEvents,
  WebSocketResponseEvents,
  WSBuildImageLogsResponseMessage,
  WSContainerLogsResponseMessage,
  WSContainerLogsSubscribeRequestMessage,
  WSContainerUpdateResponseMessage,
  WSCreateContainerRequestMessage,
  WSCreateContainerResponseMessage,
} from './websocket-types';

export interface ServerToClientEvents {
  [WebSocketResponseEvents.ContainerLogsResponse]: (message: WSContainerLogsResponseMessage) => void;
  [WebSocketResponseEvents.BuildImageLogsResponse]: (message: WSBuildImageLogsResponseMessage) => void;
  [WebSocketResponseEvents.CreateContainerResponse]: (message: WSCreateContainerResponseMessage) => void;
  [WebSocketResponseEvents.ContainerUpdateResponse]: (message: WSContainerUpdateResponseMessage) => void;
}

export interface ClientToServerEvents {
  [WebSocketRequestEvents.ContainerLogsSubscribeRequest]: (message: WSContainerLogsSubscribeRequestMessage) => void;
  [WebSocketRequestEvents.CreateContainerRequest]: (message: WSCreateContainerRequestMessage) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InterServerEvents {}

export interface SocketData {
  userId: number;
}
