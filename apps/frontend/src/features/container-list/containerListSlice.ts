import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Container } from '../../types/models/containerType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';
import { api } from '../../api/backend-api';

interface ContainerListState {
  containerList: Array<Container>;
  status: Status;
  error: Error;
}

const initialState: ContainerListState = {
  containerList: [],
  status: 'idle',
  error: null,
};

export const fetchContainerListThunk = createAsyncThunk('containerList/fetchContainerList', () =>
  api.v1ContainerAllGet()
);

const containerListSlice = createSlice({
  name: 'containerList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchContainerListThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchContainerListThunk.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.containerList = action.payload;
      })
      .addCase(fetchContainerListThunk.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.status = 'failed';
      });
  },
});

export const containerListReducer = containerListSlice.reducer;
