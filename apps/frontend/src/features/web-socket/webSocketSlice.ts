import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebSocketContainerLogsRequest, WebSocketContainerLogs, WebSocketMessage } from 'common-src';

export interface WebSocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  messages: WebSocketContainerLogs[];
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
    receiveMessage: (state, action: PayloadAction<WebSocketContainerLogs>) => {
      state.messages.push(action.payload);
    },
    buildLogs: (state, action: PayloadAction<WebSocketContainerLogs>) => {
      state.messages.push(action.payload);
    },
    // TODO: Replace this with createAction from @redux/toolkit
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    sendMessage: (state, action: PayloadAction<WebSocketContainerLogsRequest>) => {},
  },
});

export const webSocketActions = webSocketSlice.actions;
export const webSocketReducer = webSocketSlice.reducer;
