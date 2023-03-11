import { createAction, createSlice } from '@reduxjs/toolkit';

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

const unsupported = createAction('websocket/unsupported');

export const webSocketActions = {
  unsupported,
  ...webSocketSlice.actions,
};
export const webSocketReducer = webSocketSlice.reducer;
