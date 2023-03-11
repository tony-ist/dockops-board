import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';
import { WebSocketRequestEvents, WebSocketResponseEvents } from 'common-src';
import { containerLogsActions } from '../container/containerLogsSlice';
import { webSocketActions } from './webSocketSlice';
import { createContainerActions } from '../container/createContainerSlice';
import { containersActions } from '../container/containersSlice';
import { buildImageLogsActions } from '../container/buildImageLogsSlice';

// TODO: Generate webSocketRequestActions out of webSocketRequestEventsByActionType keys
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
  [WebSocketResponseEvents.BuildImageLogsResponse]: buildImageLogsActions.wsReceive,
  [WebSocketResponseEvents.ContainerLogsResponse]: containerLogsActions.wsReceive,
  [WebSocketResponseEvents.ContainerUpdateResponse]: containersActions.wsContainerUpdateSuccess,
} as const;
export const errorActionsByResponseEvents: ActionsByResponseEvents = {
  [WebSocketResponseEvents.CreateContainerResponse]: createContainerActions.wsError,
  [WebSocketResponseEvents.BuildImageLogsResponse]: webSocketActions.unsupported,
  [WebSocketResponseEvents.ContainerLogsResponse]: webSocketActions.unsupported,
  [WebSocketResponseEvents.ContainerUpdateResponse]: webSocketActions.unsupported,
} as const;
