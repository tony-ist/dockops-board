import { Container, DbContainerId, Log } from './model-types';
import { GetContainerLogsRequest, PostCreateContainerRequest } from './container-types';

// TODO: Linter does not lint semicolons in this file
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
  ContainerUpdateResponse = 'ContainerUpdateResponse',
}

export type WSContainerPayload = { container: Container }

export type WSCreateContainerRequestPayload = PostCreateContainerRequest;
export type WSCreateContainerResponsePayload = WSContainerPayload;
export type WSContainerUpdateResponsePayload = WSContainerPayload;
export type WSContainerLogsSubscribeRequestPayload = GetContainerLogsRequest & DbContainerId;
export type WSContainerLogsResponsePayload = Log & DbContainerId;
export type WSBuildImageLogsResponsePayload = Log & DbContainerId;

export type WSCreateContainerRequestMessage = WSRequestMessage<WSCreateContainerRequestPayload>
export type WSCreateContainerResponseMessage = WSResponseMessage<WSCreateContainerResponsePayload>
export type WSContainerUpdateResponseMessage = WSResponseMessage<WSContainerUpdateResponsePayload>
export type WSContainerLogsSubscribeRequestMessage = WSRequestMessage<WSContainerLogsSubscribeRequestPayload>
export type WSContainerLogsResponseMessage = WSResponseMessage<WSContainerLogsResponsePayload>
export type WSBuildImageLogsResponseMessage = WSResponseMessage<WSBuildImageLogsResponsePayload>

export type WSRequestMessage<Payload> = { jwtToken: string } & Payload;

export type WSErrorResponseMessage = { error: string };
export type WSResponseMessage<Payload> = Payload | WSErrorResponseMessage;
