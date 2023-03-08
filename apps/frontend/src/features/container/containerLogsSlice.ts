import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Log, WSBuildImageLogsResponseMessage, WSContainerLogsResponseMessage } from 'common-src';
import { createContainerActions } from './createContainerSlice';

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
    receiveContainerLogs: (state, action: PayloadAction<WSContainerLogsResponseMessage>) => {
      state.messages.push(action.payload);
    },
    receiveBuildLogs: (state, action: PayloadAction<WSBuildImageLogsResponseMessage>) => {
      state.messages.push(action.payload);
    },
    clear: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(createContainerActions.createContainerError, (state, action) => {
      state.messages.push({ text: action.payload.error as string });
    });
  },
});

export const containerLogsActions = containerLogsSlice.actions;
export const containerLogsReducer = containerLogsSlice.reducer;
