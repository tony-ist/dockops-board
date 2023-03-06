import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';
import { api } from '../../api/backend-api';
import { containersActions } from './containersSlice';
import { Message, V1ContainerCreatePostRequest } from '../../generated-sources/backend-api';
import { ThunkAPI } from '../../types/thunkAPI';

interface ContainerListState {
  dbContainerId: number | null;
  status: Status;
  error: Error;
}

const initialState: ContainerListState = {
  dbContainerId: null,
  status: 'idle',
  error: null,
};

export const createContainerThunk = createAsyncThunk<Message, V1ContainerCreatePostRequest, ThunkAPI>(
  'containers/createContainer',
  (container, thunkAPI) => api(thunkAPI.getState().login.jwtToken).v1ContainerCreatePost({ body: container })
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
