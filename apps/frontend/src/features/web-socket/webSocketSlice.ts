import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebSocketMessage } from 'common-src';
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

const unsupported = createAction('websocket/unsupported');

export const webSocketActions = {
  unsupported,
  ...webSocketSlice.actions,
};
export const webSocketReducer = webSocketSlice.reducer;
