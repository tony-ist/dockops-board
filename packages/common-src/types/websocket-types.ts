import { Container, DbContainerId, Log } from './model-types';
import { GetContainerLogsRequest, PostCreateContainerRequest } from './rest-types';

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
// TODO: Remove dependency from rest types
export type WSCreateContainerRequest = PostCreateContainerRequest;
export type WSCreateContainerResponse = { container: Container };
export type WSContainerLogsSubscribeRequest = GetContainerLogsRequest & DbContainerId;
export type WSContainerLogsResponse = Log & DbContainerId;
export type WSBuildImageLogsResponse = Log & DbContainerId;

// Use WS Request Messages on backend only
// USE WS Response Messages on frontend only
export interface WSContainerLogsSubscribeRequestMessage extends WebSocketMessage, WSContainerLogsSubscribeRequest {
  event: WebSocketRequestEvents.ContainerLogsSubscribeRequest;
}

export interface WSContainerLogsResponseMessage extends WebSocketMessage, WSContainerLogsResponse {
  event: WebSocketResponseEvents.ContainerLogsResponse;
}

export interface WSCreateContainerRequestMessage extends WebSocketMessage, WSCreateContainerRequest {
  event: WebSocketRequestEvents.CreateContainerRequest;
}

export interface WSCreateContainerResponseMessage extends WebSocketMessage, WSCreateContainerResponse {
  event: WebSocketResponseEvents.CreateContainerResponse;
}

export interface WSBuildImageLogsResponseMessage extends WebSocketMessage, WSBuildImageLogsResponse {
  event: WebSocketResponseEvents.BuildImageLogsResponse;
}

export interface WebSocketMessage {
  event: WebSocketRequestEvents | WebSocketResponseEvents;
  jwtToken?: string;
  error?: string;
}
