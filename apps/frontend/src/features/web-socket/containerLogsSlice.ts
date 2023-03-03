import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Log } from 'common-src';

export interface ContainerLogsState {
  messages: Log[];
}

const initialState: ContainerLogsState = {
  messages: [],
};

const containerLogsSlice = createSlice({
  name: 'containerLogs',
  initialState,
  reducers: {
    receiveContainerLogs: (state, action: PayloadAction<Log>) => {
      state.messages.push(action.payload);
    },
    receiveBuildLogs: (state, action: PayloadAction<Log>) => {
      state.messages.push(action.payload);
    },
  },
});

export const containerLogsActions = containerLogsSlice.actions;
export const containerLogsReducer = containerLogsSlice.reducer;
