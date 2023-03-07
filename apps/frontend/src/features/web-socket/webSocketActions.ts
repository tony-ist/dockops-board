import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';
import { WebSocketRequestEvents, WebSocketResponseEvents } from 'common-src';
import { containersActions } from '../container/containersSlice';
import { containerLogsActions } from '../container/containerLogsSlice';
import { webSocketActions } from './webSocketSlice';

// TODO: Generate webSocketRequestActions out of webSocketEventsByAction keys
export const webSocketRequestActions = [webSocketActions.createContainerRequest, webSocketActions.containerLogsRequest];
export const webSocketEventsByAction = {
  [webSocketActions.createContainerRequest.type]: WebSocketRequestEvents.CreateContainerRequest,
  [webSocketActions.containerLogsRequest.type]: WebSocketRequestEvents.ContainerLogsSubscribeRequest,
};

type ActionsByResponseEvents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in WebSocketResponseEvents]: ActionCreatorWithOptionalPayload<any>;
};
export const actionsByResponseEvents: ActionsByResponseEvents = {
  [WebSocketResponseEvents.CreateContainerResponse]: containersActions.createContainerFulfilled,
  [WebSocketResponseEvents.BuildImageLogsResponse]: containerLogsActions.receiveBuildLogs,
  [WebSocketResponseEvents.ContainerLogsResponse]: containerLogsActions.receiveContainerLogs,
  [WebSocketResponseEvents.ErrorResponse]: webSocketActions.error,
} as const;
