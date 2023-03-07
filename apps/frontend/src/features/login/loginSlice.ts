import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/statusType';
import { NullableError } from '../../types/nullableErrorType';
import { api, createAppAsyncThunk } from '../../api/backend-api';

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

export const loginThunk = createAppAsyncThunk('login/login', api.v1LoginPost.bind(api));

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = 'idle';
      state.error = null;
      state.jwtToken = null;
    },
  },
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
