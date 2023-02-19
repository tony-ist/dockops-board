import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Container } from '../../types/models/containerType';
import { Status } from '../../types/statusType';
import { Error } from '../../types/errorType';
import urlJoin from 'url-join';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

export const fetchContainerList = createAsyncThunk('containerList/fetchContainerList', async () => {
  const response = await fetch(urlJoin(backendUrl, 'containers'));
  return response.json();
});

const containerListSlice = createSlice({
  name: 'containerList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchContainerList.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchContainerList.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.containerList = action.payload;
      })
      .addCase(fetchContainerList.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.status = 'failed';
      });
  },
});

export default containerListSlice.reducer;
