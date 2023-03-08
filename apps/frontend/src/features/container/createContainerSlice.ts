import { createAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api, createAppAsyncThunk } from '../../api/backend-api';
import { WSCreateContainerResponseMessage } from 'common-src';

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

const createContainerSuccess = createAction<WSCreateContainerResponseMessage>('createContainer/success');
const createContainerError = createAction<WSCreateContainerResponseMessage>('createContainer/error');

const createContainerSlice = createSlice({
  name: 'createContainer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createContainerThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(createContainerThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.status = 'failed';
      })
      // No handler for createContainerThunk.fulfilled becasuse we wait for success via websocket
      .addCase(createContainerSuccess, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.dbContainerId = action.payload.container.id;
      })
      .addCase(createContainerError, (state, action) => {
        state.error = action.payload.error ?? null;
        state.status = 'failed';
      });
  },
});

export const createContainerActions = {
  createContainerSuccess,
  createContainerError,
  ...createContainerSlice.actions,
};
export const createContainerReducer = createContainerSlice.reducer;
