import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WebSocketLogs } from 'common-src';

export interface ContainerLogsState {
  messages: WebSocketLogs[];
}

const initialState: ContainerLogsState = {
  messages: [],
};

const containerLogsSlice = createSlice({
  name: 'containerLogs',
  initialState,
  reducers: {
    receiveContainerLogs: (state, action: PayloadAction<WebSocketLogs>) => {
      state.messages.push(action.payload);
    },
    receiveBuildLogs: (state, action: PayloadAction<WebSocketLogs>) => {
      state.messages.push(action.payload);
    },
  },
});

export const containerLogsActions = containerLogsSlice.actions;
export const containerLogsReducer = containerLogsSlice.reducer;
