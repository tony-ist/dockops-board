import { CreateContainerRequest } from 'common-src';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { DbContainerId } from '../../generated-sources/backend-api';

export interface WebSocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: WebSocketState = {
  isEstablishingConnection: false,
  isConnected: false,
};

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = false;
    },
  },
});

const createContainerRequest = createAction<CreateContainerRequest>('containers/createContainerRequest');
const containerLogsRequest = createAction<DbContainerId>('containers/containerLogsRequest');

export const webSocketActions = { ...webSocketSlice.actions, createContainerRequest, containerLogsRequest };
export const webSocketReducer = webSocketSlice.reducer;
