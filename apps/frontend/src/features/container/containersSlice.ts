import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Container } from '../../types/models/containerType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';
import { api } from '../../api/backend-api';
import { RootState } from '../../types/storeTypes';

const containersAdapter = createEntityAdapter<Container>();

interface ContainersState {
  status: Status;
  error: Error;
}

const initialState = containersAdapter.getInitialState<ContainersState>({
  status: 'idle',
  error: null,
});

export const fetchContainersThunk = createAsyncThunk(
  'containers/fetchContainers',
  () => api.v1ContainerAllGet()
);

const containersSlice = createSlice({
  name: 'containers',
  initialState,
  reducers: {
    createContainerFulfilled: (state, action: PayloadAction<Container>) => {
      containersAdapter.upsertOne(state, action.payload);
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
