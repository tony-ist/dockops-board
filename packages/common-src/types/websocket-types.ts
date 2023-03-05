import { ContainerLogsResponse, ContainerLogsSubscribeRequest, CreateContainerRequest } from './model-types';

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
}

export interface WebSocketContainerLogsSubscribeRequest extends WebSocketMessage, ContainerLogsSubscribeRequest {
  event: WebSocketRequestEvents.ContainerLogsSubscribeRequest;
}

export interface WebSocketContainerLogsResponse extends WebSocketMessage, ContainerLogsResponse {
  event: WebSocketResponseEvents.ContainerLogsResponse;
}

export interface WebSocketCreateContainerRequest extends WebSocketMessage, CreateContainerRequest {
  event: WebSocketRequestEvents.CreateContainerRequest;
}

export interface WebSocketCreateContainerResponse extends WebSocketMessage {
  event: WebSocketResponseEvents.CreateContainerResponse;
}

export interface WebSocketBuildImageLogsResponse extends WebSocketMessage {
  event: WebSocketResponseEvents.BuildImageLogsResponse;
}

export interface WebSocketMessage {
  event: WebSocketRequestEvents | WebSocketResponseEvents;
}
