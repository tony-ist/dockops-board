import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api, createAppAsyncThunk } from '../../api/backend-api';

interface UpdateContainerState {
  status: Status;
  error: NullableError;
}

const initialState: UpdateContainerState = {
  status: 'idle',
  error: null,
};

export const startContainerThunk = createAppAsyncThunk(
  'containers/startContainer',
  api.v1ContainerDbContainerIdStartPost.bind(api)
);
export const stopContainerThunk = createAppAsyncThunk(
  'containers/stopContainer',
  api.v1ContainerDbContainerIdStopPost.bind(api)
);

const updateContainerSlice = createSlice({
  name: 'updateContainer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(startContainerThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(startContainerThunk.fulfilled, (state) => {
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(startContainerThunk.rejected, (state, action) => {
        state.error = JSON.stringify(action.meta.message);
        state.status = 'failed';
      })
      .addCase(stopContainerThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(stopContainerThunk.fulfilled, (state) => {
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(stopContainerThunk.rejected, (state, action) => {
        state.error = JSON.stringify(action.meta.message);
        state.status = 'failed';
      });
  },
});

export const updateContainerActions = updateContainerSlice.actions;
export const updateContainerReducer = updateContainerSlice.reducer;
