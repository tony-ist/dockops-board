import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostCreateContainerRequest, WebSocketMessage, WSContainerLogsSubscribeRequest } from 'common-src';
import { NullableError } from '../../types/nullableErrorType';

export interface WebSocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  error: NullableError;
}

const initialState: WebSocketState = {
  isEstablishingConnection: false,
  isConnected: false,
  error: null,
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
    error: (state, action: PayloadAction<WebSocketMessage>) => {
      state.error = action.payload.error ?? null;
    },
  },
});

const createContainerRequest = createAction<PostCreateContainerRequest>('containers/createContainerRequest');
const containerLogsSubscribeRequest = createAction<WSContainerLogsSubscribeRequest>(
  'containers/containerLogsSubscribeRequest'
);

export const webSocketActions = { ...webSocketSlice.actions, createContainerRequest, containerLogsSubscribeRequest };
export const webSocketReducer = webSocketSlice.reducer;
