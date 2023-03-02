import { createAction } from '@reduxjs/toolkit';
import { CreateContainerRequest, WebSocketContainerLogsRequest, WebSocketRequestEvents } from 'common-src';

// TODO: Normalize types of web socket actions
export const createContainerRequest = createAction<CreateContainerRequest>('containers/createContainerRequest');
export const containerLogsRequest = createAction<WebSocketContainerLogsRequest>('containers/containerLogsRequest');
export const webSocketRequestActions = [createContainerRequest, containerLogsRequest];
export const webSocketEventsByAction = {
  [createContainerRequest.type]: WebSocketRequestEvents.CreateContainerRequest,
  [containerLogsRequest.type]: WebSocketRequestEvents.ContainerLogsSubscribe,
};
