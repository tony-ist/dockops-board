import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NewContainerRequest, NewContainerResponse } from '../../types/models/containerType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';
import { api } from '../../api/backend-api';

interface ContainerListState {
  container: NewContainerResponse | null;
  status: Status;
  error: Error;
}

const initialState: ContainerListState = {
  container: null,
  status: 'idle',
  error: null,
};

export const newContainerThunk = createAsyncThunk<NewContainerResponse, NewContainerRequest>(
  'newContainer/newContainer',
  (container) => api.v1ContainerNewPost({ body: container })
);

const newContainerSlice = createSlice({
  name: 'newContainer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(newContainerThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(newContainerThunk.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.container = action.payload;
      })
      .addCase(newContainerThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.status = 'failed';
      });
  },
});

export const newContainerActions = newContainerSlice.actions;
export const newContainerReducer = newContainerSlice.reducer;
