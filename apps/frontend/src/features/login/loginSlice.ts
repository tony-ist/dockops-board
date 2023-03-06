import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginRequest } from 'common-src';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api } from '../../api/backend-api';

export interface LoginState {
  status: Status;
  error: NullableError;
  jwtToken: string | null;
}

const initialState: LoginState = {
  status: 'idle',
  error: null,
  jwtToken: localStorage.getItem('jwtToken'),
};

export const loginThunk = createAsyncThunk<string, LoginRequest>('login/login', (credentials) =>
  api().v1LoginPost({ body: credentials })
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.jwtToken = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message ?? 'Unknown error';
        state.status = 'failed';
      });
  },
});

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
