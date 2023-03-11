import {
  WebSocketRequestEvents,
  WebSocketResponseEvents,
  WSBuildImageLogsResponseMessage,
  WSContainerLogsResponseMessage,
  WSContainerLogsSubscribeRequestMessage,
  WSContainerUpdateResponsePayload,
  WSCreateContainerRequestMessage,
  WSCreateContainerResponseMessage
} from './websocket-types';

export interface ServerToClientEvents {
  [WebSocketResponseEvents.ContainerLogsResponse]: (message: WSContainerLogsResponseMessage) => void;
  [WebSocketResponseEvents.BuildImageLogsResponse]: (message: WSBuildImageLogsResponseMessage) => void;
  [WebSocketResponseEvents.CreateContainerResponse]: (message: WSCreateContainerResponseMessage) => void;
  [WebSocketResponseEvents.ContainerUpdateResponse]: (message: WSContainerUpdateResponsePayload) => void;
}

export interface ClientToServerEvents {
  [WebSocketRequestEvents.ContainerLogsSubscribeRequest]: (message: WSContainerLogsSubscribeRequestMessage) => void;
  [WebSocketRequestEvents.CreateContainerRequest]: (message: WSCreateContainerRequestMessage) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  userId: number;
}
