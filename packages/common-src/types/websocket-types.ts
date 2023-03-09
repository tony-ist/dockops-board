import { Container, DbContainerId, Log } from './model-types';
import { GetContainerLogsRequest, PostCreateContainerRequest } from './container-types';

export enum WebSocketRequestEvents {
  ContainerLogsSubscribeRequest = 'ContainerLogsSubscribeRequest',
  // InteractiveShellRequest = 'InteractiveShellRequest',
  CreateContainerRequest = 'CreateContainerRequest',
}

export enum WebSocketResponseEvents {
  ContainerLogsResponse = 'ContainerLogsResponse',
  // InteractiveShellResponse = 'InteractiveShellResponse',
  BuildImageLogsResponse = 'BuildImageLogsResponse',
  CreateContainerResponse = 'CreateContainerResponse',
  ErrorResponse = 'ErrorResponse',
}

// Use WS Request types on frontend only
export type WSCreateContainerRequestPayload = PostCreateContainerRequest;
export type WSCreateContainerResponsePayload = { container: Container };
export type WSContainerLogsSubscribeRequestPayload = GetContainerLogsRequest & DbContainerId;
export type WSContainerLogsResponsePayload = Log & DbContainerId;
export type WSBuildImageLogsResponsePayload = Log & DbContainerId;

// Use WS Request Messages on backend only
// Use WS Response Messages on frontend only
export interface WSContainerLogsSubscribeRequestMessage extends WebSocketMessage, WSContainerLogsSubscribeRequestPayload {
  event: WebSocketRequestEvents.ContainerLogsSubscribeRequest;
}

export interface WSContainerLogsResponseMessage extends WebSocketMessage, WSContainerLogsResponsePayload {
  event: WebSocketResponseEvents.ContainerLogsResponse;
}

export interface WSCreateContainerRequestMessage extends WebSocketMessage, WSCreateContainerRequestPayload {
  event: WebSocketRequestEvents.CreateContainerRequest;
}

export interface WSCreateContainerResponseMessage extends WebSocketMessage, WSCreateContainerResponsePayload {
  event: WebSocketResponseEvents.CreateContainerResponse;
}

export interface WSBuildImageLogsResponseMessage extends WebSocketMessage, WSBuildImageLogsResponsePayload {
  event: WebSocketResponseEvents.BuildImageLogsResponse;
}

export interface WebSocketMessage {
  event: WebSocketRequestEvents | WebSocketResponseEvents;
  jwtToken?: string;
  error?: string;
}
