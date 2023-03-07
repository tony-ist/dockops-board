import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api, createAppAsyncThunk } from '../../api/backend-api';

interface StartContainerState {
  status: Status;
  error: NullableError;
}

const initialState: StartContainerState = {
  status: 'idle',
  error: null,
};

export const startContainerThunk = createAppAsyncThunk(
  'containers/startContainer',
  api.v1ContainerDbContainerIdStartPost.bind(api)
);

const startContainerSlice = createSlice({
  name: 'startContainer',
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
        state.error = action.error.message ?? null;
        state.status = 'failed';
      });
  },
});

export const startContainerActions = startContainerSlice.actions;
export const startContainerReducer = startContainerSlice.reducer;
