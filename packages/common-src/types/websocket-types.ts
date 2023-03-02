import { Container, CreateContainerRequest, Log } from './model-types';

export enum WebSocketResponseEvents {
  ContainerLogs = 'ContainerLogs',
  InteractiveShellLogs = 'InteractiveShellLogs',
  BuildImageLogs = 'BuildImageLogs',
  CreateContainerResponse = 'CreateContainerResponse',
}

export enum WebSocketRequestEvents {
  ContainerLogsSubscribe = 'ContainerLogsSubscribe',
  InteractiveShellRequest = 'InteractiveShellRequest',
  CreateContainerRequest = 'CreateContainerRequest',
}

export interface WebSocketContainerLogsRequest extends WebSocketMessage {
  dbContainerId: number;
  tail?: number;
}

export interface WebSocketCreateContainerRequest extends WebSocketMessage, CreateContainerRequest {}

export interface WebSocketLogs extends WebSocketMessage, Log {}

export interface WebSocketInteractiveShellRequest extends WebSocketMessage {
  dbContainerId: number;
}

export interface WebSocketCreateContainerResponse extends WebSocketMessage {
  container: Container;
}

export interface WebSocketMessage {
  event: WebSocketRequestEvents | WebSocketResponseEvents;
}
