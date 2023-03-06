import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';
import { api } from '../../api/backend-api';
import { RootState } from '../../types/storeTypes';
import { Container, ContainerAllResponse } from '../../generated-sources/backend-api';
import { WebSocketCreateContainerResponse } from 'common-src';
import { ThunkAPI } from '../../types/thunkAPI';

const containersAdapter = createEntityAdapter<Container>();

interface ContainersState {
  status: Status;
  error: Error;
}

const initialState = containersAdapter.getInitialState<ContainersState>({
  status: 'idle',
  error: null,
});

export const fetchContainersThunk = createAsyncThunk<ContainerAllResponse, void, ThunkAPI>(
  'containers/fetchContainers',
  (_: void, thunkAPI) => api(thunkAPI.getState().login.jwtToken).v1ContainerAllGet()
);

const containersSlice = createSlice({
  name: 'containers',
  initialState,
  reducers: {
    createContainerFulfilled: (state, action: PayloadAction<WebSocketCreateContainerResponse>) => {
      containersAdapter.upsertOne(state, action.payload.container);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContainersThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchContainersThunk.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        containersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchContainersThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error';
        state.status = 'failed';
      });
  },
});

export const containersActions = containersSlice.actions;
export const containersReducer = containersSlice.reducer;
export const containersSelectors = containersAdapter.getSelectors<RootState>((state) => state.containers);
