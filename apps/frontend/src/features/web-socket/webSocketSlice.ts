import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebSocketMessage } from 'common-src';

export interface WebSocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  messages: WebSocketMessage[];
}

const initialState: WebSocketState = {
  isEstablishingConnection: false,
  isConnected: false,
  messages: [],
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
    receiveMessage: (state, action: PayloadAction<WebSocketMessage>) => {
      state.messages.push(action.payload);
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    sendMessage: (state, action: PayloadAction<WebSocketMessage>) => {},
  },
});

export const webSocketActions = webSocketSlice.actions;
export const webSocketReducer = webSocketSlice.reducer;
