export enum WebSocketResponse {
  ContainerLogsResponse = 'ContainerLogsResponse',
  InteractiveShellResponse = 'InteractiveShellResponse',
}

export enum WebSocketRequest {
  ContainerLogsRequest = 'ContainerLogsRequest',
  InteractiveShellRequest = 'InteractiveShellRequest',
}

// TODO: Split into different types of messages
export interface WebSocketMessage {
  event: WebSocketRequest | WebSocketResponse;
  dbContainerId?: number;
  tail?: number;
  command?: string;
  text?: string;
}
