import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api, createAppAsyncThunk } from '../../api/backend-api';
import { loginThunk } from '../login/loginSlice';

interface GetContainerState {
  status: Status;
  error: NullableError;
}

const initialState: GetContainerState = {
  status: 'idle',
  error: null,
};

export const fetchContainerByIdThunk = createAppAsyncThunk(
  'containers/fetchContainerById',
  api.v1ContainerDbContainerIdGet.bind(api)
);

const getContainerSlice = createSlice({
  name: 'getContainer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchContainerByIdThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchContainerByIdThunk.fulfilled, (state) => {
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(fetchContainerByIdThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error';
        state.status = 'failed';
      })
      .addCase(loginThunk.fulfilled, () => initialState);
  },
});

export const getContainerActions = getContainerSlice.actions;
export const getContainerReducer = getContainerSlice.reducer;
