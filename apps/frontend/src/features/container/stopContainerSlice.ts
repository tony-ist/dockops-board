import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api, createAppAsyncThunk } from '../../api/backend-api';

interface StopContainerState {
  status: Status;
  error: NullableError;
}

const initialState: StopContainerState = {
  status: 'idle',
  error: null,
};

export const stopContainerThunk = createAppAsyncThunk(
  'containers/stopContainer',
  api.v1ContainerDbContainerIdStopPost.bind(api)
);

const stopContainerSlice = createSlice({
  name: 'stopContainer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(stopContainerThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(stopContainerThunk.fulfilled, (state) => {
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(stopContainerThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.status = 'failed';
      });
  },
});

export const stopContainerActions = stopContainerSlice.actions;
export const stopContainerReducer = stopContainerSlice.reducer;
