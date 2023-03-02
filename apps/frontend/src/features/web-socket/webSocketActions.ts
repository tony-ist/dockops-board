import { ActionCreatorWithOptionalPayload, createAction } from '@reduxjs/toolkit';
import {
  ContainerLogsRequest,
  CreateContainerRequest,
  WebSocketRequestEvents,
  WebSocketResponseEvents,
} from 'common-src';
import { containersActions } from '../container/containersSlice';
import { containerLogsActions } from './containerLogsSlice';

export const createContainerRequest = createAction<CreateContainerRequest>('containers/createContainerRequest');
export const containerLogsRequest = createAction<ContainerLogsRequest>('containers/containerLogsRequest');
export const webSocketRequestActions = [createContainerRequest, containerLogsRequest];
export const webSocketEventsByAction = {
  [createContainerRequest.type]: WebSocketRequestEvents.CreateContainerRequest,
  [containerLogsRequest.type]: WebSocketRequestEvents.ContainerLogsSubscribe,
};
// TODO: Proper type for ActionCreatorWithOptionalPayload
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actionsByResponseEvents: { [key in WebSocketResponseEvents]: ActionCreatorWithOptionalPayload<any> } = {
  [WebSocketResponseEvents.CreateContainerResponse]: containersActions.createContainerFulfilled,
  [WebSocketResponseEvents.BuildImageLogs]: containerLogsActions.receiveBuildLogs,
  [WebSocketResponseEvents.ContainerLogs]: containerLogsActions.receiveContainerLogs,
};
