import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateContainerRequest, CreateContainerResponse } from '../../types/models/containerType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';
import { api } from '../../api/backend-api';

interface ContainerListState {
  container: CreateContainerResponse | null;
  status: Status;
  error: Error;
}

const initialState: ContainerListState = {
  container: null,
  status: 'idle',
  error: null,
};

export const createContainerThunk = createAsyncThunk<CreateContainerResponse, CreateContainerRequest>(
  'createContainer/createContainer',
  (container) => api.v1ContainerCreatePost({ body: container })
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
      .addCase(createContainerThunk.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.container = action.payload;
      })
      .addCase(createContainerThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.status = 'failed';
      });
  },
});

export const createContainerActions = createContainerSlice.actions;
export const createContainerReducer = createContainerSlice.reducer;
