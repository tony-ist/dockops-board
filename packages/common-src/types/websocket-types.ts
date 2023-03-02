// TODO: Move schemas from backend here and use json-schema-to-ts package to produce types
export enum WebSocketResponseEvents {
  ContainerLogs = 'ContainerLogs',
  InteractiveShellLogs = 'InteractiveShellLogs',
  BuildImageLogs = 'BuildImageLogs',
  CreateContainerResponse = 'CreateContainerResponse',
}

export enum WebSocketRequestEvents {
  ContainerLogsRequest = 'ContainerLogsRequest',
  InteractiveShellRequest = 'InteractiveShellRequest',
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
  container: unknown;
}

export interface WebSocketMessage {
  event: WebSocketRequestEvents | WebSocketResponseEvents;
}
