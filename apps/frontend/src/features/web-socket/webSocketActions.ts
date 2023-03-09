import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';
import { WebSocketRequestEvents, WebSocketResponseEvents } from 'common-src';
import { containerLogsActions } from '../container/containerLogsSlice';
import { webSocketActions } from './webSocketSlice';
import { createContainerActions } from '../container/createContainerSlice';

// TODO: Generate webSocketRequestActions out of webSocketEventsByAction keys
export const webSocketRequestActions = [
  createContainerActions.wsCreateContainerRequest,
  containerLogsActions.wsContainerLogsSubscribeRequest,
];
export const webSocketRequestEventsByActionType = {
  [createContainerActions.wsCreateContainerRequest.type]: WebSocketRequestEvents.CreateContainerRequest,
  [containerLogsActions.wsContainerLogsSubscribeRequest.type]: WebSocketRequestEvents.ContainerLogsSubscribeRequest,
};

type ActionsByResponseEvents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in WebSocketResponseEvents]: ActionCreatorWithOptionalPayload<any>;
};
export const actionsByResponseEvents: ActionsByResponseEvents = {
  [WebSocketResponseEvents.CreateContainerResponse]: createContainerActions.wsSuccess,
  [WebSocketResponseEvents.BuildImageLogsResponse]: containerLogsActions.wsReceiveBuildLogs,
  [WebSocketResponseEvents.ContainerLogsResponse]: containerLogsActions.wsReceiveContainerLogs,
} as const;
export const errorActionsByResponseEvents: ActionsByResponseEvents = {
  [WebSocketResponseEvents.CreateContainerResponse]: createContainerActions.wsError,
  [WebSocketResponseEvents.BuildImageLogsResponse]: webSocketActions.unsupported,
  [WebSocketResponseEvents.ContainerLogsResponse]: webSocketActions.unsupported,
} as const;
