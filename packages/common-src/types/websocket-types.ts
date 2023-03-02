import { Container } from './model-types';

export enum WebSocketResponseEvents {
  ContainerLogs = 'ContainerLogs',
  InteractiveShellLogs = 'InteractiveShellLogs',
  BuildImageLogs = 'BuildImageLogs',
  CreateContainerResponse = 'CreateContainerResponse',
}

export enum WebSocketRequestEvents {
  // TODO: Rename ContainerLogsSubscribe
  ContainerLogsRequest = 'ContainerLogsRequest',
  InteractiveShellRequest = 'InteractiveShellRequest',
  // TODO: Create container via REST API, but rename this to BuildImageLogsSubscribe?
  CreateContainerRequest = 'CreateContainerRequest',
}

export interface WebSocketContainerLogsRequest extends WebSocketMessage {
  dbContainerId: number;
  tail?: number;
}

export interface WebSocketContainerLogs extends WebSocketMessage {
  text: string;
}

export interface WebSocketCreateContainerRequest extends WebSocketMessage {
  githubURL: string;
  imageName?: string;
  dockerfileName?: string;
  containerName?: string;
}

export interface WebSocketBuildImageLogs extends WebSocketMessage {
  text: string;
}

export interface WebSocketInteractiveShellRequest extends WebSocketMessage {
  dbContainerId: number;
}

export interface WebSocketInteractiveShellResponse extends WebSocketMessage {
  text: string;
}

export interface WebSocketCreateContainerResponse extends WebSocketMessage {
  container: Container;
}

export interface WebSocketMessage {
  event: WebSocketRequestEvents | WebSocketResponseEvents;
}
