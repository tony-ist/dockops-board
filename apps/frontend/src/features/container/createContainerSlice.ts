import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api, createAppAsyncThunk } from '../../api/backend-api';
import { WSCreateContainerRequestPayload, WSCreateContainerResponsePayload, WSErrorResponseMessage } from 'common-src';

interface ContainerListState {
  dbContainerId: number | null;
  status: Status;
  error: NullableError;
}

const initialState: ContainerListState = {
  dbContainerId: null,
  status: 'idle',
  error: null,
};

export const createContainerThunk = createAppAsyncThunk(
  'createContainer/createContainer',
  api.v1ContainerCreatePost.bind(api)
);

const wsCreateContainerRequest = createAction<WSCreateContainerRequestPayload>(
  'createContainer/wsCreateContainerRequest'
);

const createContainerSlice = createSlice({
  name: 'createContainer',
  initialState,
  reducers: {
    wsSuccess: (state, action: PayloadAction<WSCreateContainerResponsePayload>) => {
      state.error = null;
      state.status = 'succeeded';
      state.dbContainerId = action.payload.container.id;
    },
    wsError: (state, action: PayloadAction<WSErrorResponseMessage>) => {
      state.error = action.payload.error ?? null;
      state.status = 'failed';
    },
    clear: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createContainerThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(createContainerThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.status = 'failed';
      });
    // No handler for createContainerThunk.fulfilled becasuse we wait for success via websocket
  },
});

export const createContainerActions = {
  wsCreateContainerRequest,
  ...createContainerSlice.actions,
};
export const createContainerReducer = createContainerSlice.reducer;
