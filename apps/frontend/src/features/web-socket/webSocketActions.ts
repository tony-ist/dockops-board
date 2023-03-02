import { createAction } from '@reduxjs/toolkit';
import { WebSocketContainerLogsRequest, WebSocketRequestEvents } from 'common-src';
import { CreateContainerRequest } from '../../types/models/containerType';

// TODO: Normalize types of web socket actions
export const createContainerRequest = createAction<CreateContainerRequest>('containers/createContainerRequest');
export const containerLogsRequest = createAction<WebSocketContainerLogsRequest>('containers/containerLogsRequest');
export const webSocketRequestActions = [
  createContainerRequest,
  containerLogsRequest,
];
export const webSocketEventsByAction = {
  [createContainerRequest.type]: WebSocketRequestEvents.CreateContainerRequest,
  [containerLogsRequest.type]: WebSocketRequestEvents.ContainerLogsRequest,
};
