import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebSocketMessage } from '../../types/models/webSocketMessageType';

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
  },
});

export const webSocketActions = webSocketSlice.actions;
export const webSocketReducer = webSocketSlice.reducer;
