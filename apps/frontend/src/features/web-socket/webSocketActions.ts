import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';
import { WebSocketRequestEvents, WebSocketResponseEvents } from 'common-src';
import { containerLogsActions } from '../container/containerLogsSlice';
import { webSocketActions } from './webSocketSlice';
import { createContainerActions } from '../container/createContainerSlice';

// TODO: Generate webSocketRequestActions out of webSocketEventsByAction keys
export const webSocketRequestActions = [
  webSocketActions.createContainerRequest,
  webSocketActions.containerLogsSubscribeRequest,
];
export const webSocketRequestEventsByActionType = {
  [webSocketActions.createContainerRequest.type]: WebSocketRequestEvents.CreateContainerRequest,
  [webSocketActions.containerLogsSubscribeRequest.type]: WebSocketRequestEvents.ContainerLogsSubscribeRequest,
};

type ActionsByResponseEvents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in WebSocketResponseEvents]: ActionCreatorWithOptionalPayload<any>;
};
export const actionsByResponseEvents: ActionsByResponseEvents = {
  [WebSocketResponseEvents.CreateContainerResponse]: createContainerActions.createContainerSuccess,
  [WebSocketResponseEvents.BuildImageLogsResponse]: containerLogsActions.receiveBuildLogs,
  [WebSocketResponseEvents.ContainerLogsResponse]: containerLogsActions.receiveContainerLogs,
  [WebSocketResponseEvents.ErrorResponse]: webSocketActions.unsupported,
} as const;
export const errorActionsByResponseEvents: ActionsByResponseEvents = {
  [WebSocketResponseEvents.CreateContainerResponse]: createContainerActions.createContainerError,
  [WebSocketResponseEvents.BuildImageLogsResponse]: webSocketActions.unsupported,
  [WebSocketResponseEvents.ContainerLogsResponse]: webSocketActions.unsupported,
  [WebSocketResponseEvents.ErrorResponse]: webSocketActions.error,
} as const;
