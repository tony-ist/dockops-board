import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api, createAppAsyncThunk } from '../../api/backend-api';
import { RootState } from '../../types/storeTypes';
import { Container } from '../../generated-sources/backend-api';
import { WebSocketCreateContainerResponse } from 'common-src';
import { loginThunk } from '../login/loginSlice';
import { fetchContainerByIdThunk } from './getContainerSlice';

const containersAdapter = createEntityAdapter<Container>();

interface ContainersState {
  status: Status;
  error: NullableError;
}

const initialState = containersAdapter.getInitialState<ContainersState>({
  status: 'idle',
  error: null,
});

export const fetchContainersThunk = createAppAsyncThunk('containers/fetchContainers', api.v1ContainerAllGet.bind(api));

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
      })
      .addCase(fetchContainerByIdThunk.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        containersAdapter.upsertOne(state, action.payload);
      })
      .addCase(loginThunk.fulfilled, () => initialState);
  },
});

export const containersActions = containersSlice.actions;
export const containersReducer = containersSlice.reducer;
export const containersSelectors = containersAdapter.getSelectors<RootState>((state) => state.containers);
