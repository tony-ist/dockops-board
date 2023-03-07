import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api, createAppAsyncThunk } from '../../api/backend-api';
import { containersActions } from './containersSlice';

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
  'containers/createContainer',
  api.v1ContainerCreatePost.bind(api)
);

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
      .addCase(containersActions.createContainerFulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.dbContainerId = action.payload.container.id;
      })
      // TODO: Handle containersActions.createContainerRejected instead
      .addCase(createContainerThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.status = 'failed';
      });
  },
});

export const createContainerActions = createContainerSlice.actions;
export const createContainerReducer = createContainerSlice.reducer;
