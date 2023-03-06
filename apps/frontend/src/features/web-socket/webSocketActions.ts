import { ActionCreatorWithOptionalPayload, createAction } from '@reduxjs/toolkit';
import { CreateContainerRequest, WebSocketRequestEvents, WebSocketResponseEvents } from 'common-src';
import { containersActions } from '../container/containersSlice';
import { containerLogsActions } from '../container/containerLogsSlice';
import { DbContainerId } from '../../generated-sources/backend-api';

export const createContainerRequest = createAction<CreateContainerRequest>('containers/createContainerRequest');
export const containerLogsRequest = createAction<DbContainerId>('containers/containerLogsRequest');
// TODO: Generate webSocketRequestActions out of webSocketEventsByAction keys
export const webSocketRequestActions = [createContainerRequest, containerLogsRequest];
export const webSocketEventsByAction = {
  [createContainerRequest.type]: WebSocketRequestEvents.CreateContainerRequest,
  [containerLogsRequest.type]: WebSocketRequestEvents.ContainerLogsSubscribeRequest,
};

type ActionsByResponseEvents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in WebSocketResponseEvents]: ActionCreatorWithOptionalPayload<any>;
};
export const actionsByResponseEvents: ActionsByResponseEvents = {
  [WebSocketResponseEvents.CreateContainerResponse]: containersActions.createContainerFulfilled,
  [WebSocketResponseEvents.BuildImageLogsResponse]: containerLogsActions.receiveBuildLogs,
  [WebSocketResponseEvents.ContainerLogsResponse]: containerLogsActions.receiveContainerLogs,
} as const;
