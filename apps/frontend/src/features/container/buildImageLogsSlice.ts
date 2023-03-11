import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Log, WSBuildImageLogsResponsePayload } from 'common-src';
import { createContainerActions } from './createContainerSlice';

export interface BuildLogsState {
  messages: Log[];
}

const initialState: BuildLogsState = {
  messages: [],
};

const buildImageLogsSlice = createSlice({
  name: 'buildImageLogs',
  initialState,
  reducers: {
    wsReceive: (state, action: PayloadAction<WSBuildImageLogsResponsePayload>) => {
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

export const buildImageLogsActions = buildImageLogsSlice.actions;
export const buildImageLogsReducer = buildImageLogsSlice.reducer;
