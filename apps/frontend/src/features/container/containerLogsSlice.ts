import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Log, WSContainerLogsResponsePayload, WSContainerLogsSubscribeRequestPayload } from 'common-src';

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
    wsReceive: (state, action: PayloadAction<WSContainerLogsResponsePayload>) => {
      state.messages.push(action.payload);
    },
    clear: () => initialState,
  },
});

export const containerLogsActions = {
  wsContainerLogsSubscribeRequest,
  ...containerLogsSlice.actions,
};
export const containerLogsReducer = containerLogsSlice.reducer;
