import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Log,
  WSBuildImageLogsResponseMessage,
  WSContainerLogsResponseMessage,
  WSContainerLogsSubscribeRequestPayload,
} from 'common-src';
import { createContainerActions } from './createContainerSlice';

export interface ContainerLogsState {
  messages: Log[];
}

const initialState: ContainerLogsState = {
  messages: [],
};

const wsContainerLogsSubscribeRequest = createAction<WSContainerLogsSubscribeRequestPayload>(
  'containerLogs/wsContainerLogsSubscribeRequest'
);

const containerLogsSlice = createSlice({
  name: 'containerLogs',
  initialState,
  reducers: {
    wsReceiveContainerLogs: (state, action: PayloadAction<WSContainerLogsResponseMessage>) => {
      state.messages.push(action.payload);
    },
    wsReceiveBuildLogs: (state, action: PayloadAction<WSBuildImageLogsResponseMessage>) => {
      state.messages.push(action.payload);
    },
    clear: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(createContainerActions.wsError, (state, action) => {
      state.messages.push({ text: action.payload.error as string });
    });
  },
});

export const containerLogsActions = {
  wsContainerLogsSubscribeRequest,
  ...containerLogsSlice.actions,
};
export const containerLogsReducer = containerLogsSlice.reducer;
