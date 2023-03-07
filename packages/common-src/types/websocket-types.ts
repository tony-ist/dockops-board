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

export type WSCreateContainerResponse = { container: Container };
export type WSContainerLogsSubscribeRequest = GetContainerLogsRequest & DbContainerId;
export type WSContainerLogsResponse = Log & DbContainerId;
export type WSBuildImageLogsResponse = Log & DbContainerId;

export interface WebSocketContainerLogsSubscribeRequest extends WebSocketMessage, WSContainerLogsSubscribeRequest {
  event: WebSocketRequestEvents.ContainerLogsSubscribeRequest;
}

export interface WebSocketContainerLogsResponse extends WebSocketMessage, WSContainerLogsResponse {
  event: WebSocketResponseEvents.ContainerLogsResponse;
}

export interface WebSocketCreateContainerRequest extends WebSocketMessage, PostCreateContainerRequest {
  event: WebSocketRequestEvents.CreateContainerRequest;
}

export interface WebSocketCreateContainerResponse extends WebSocketMessage, WSCreateContainerResponse {
  event: WebSocketResponseEvents.CreateContainerResponse;
}

export interface WebSocketBuildImageLogsResponse extends WebSocketMessage, WSBuildImageLogsResponse {
  event: WebSocketResponseEvents.BuildImageLogsResponse;
}

export interface WebSocketMessage {
  event: WebSocketRequestEvents | WebSocketResponseEvents;
  jwtToken?: string;
  error?: string;
}
