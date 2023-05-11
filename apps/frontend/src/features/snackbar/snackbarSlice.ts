import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { startContainerThunk, stopContainerThunk } from '../container/updateContainerSlice';
import { AnyAction } from 'redux';
import { loginActions } from '../login/loginSlice';

interface SnackbarState {
  isOpen: boolean;
  message: string | null;
}

const initialState: SnackbarState = {
  isOpen: false,
  message: null,
};

function getErrorMessage(action: AnyAction) {
  return action.meta.status === 401 ? 'You have been logged out.' : JSON.stringify(action.meta.message);
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    close: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(startContainerThunk.rejected, (state, action) => {
        state.isOpen = true;
        state.message = getErrorMessage(action);
      })
      .addCase(stopContainerThunk.rejected, (state, action) => {
        state.isOpen = true;
        state.message = getErrorMessage(action);
      })
      .addCase(loginActions.logout, (state) => {
        state.isOpen = true;
        state.message = 'You have been logged out.';
      });
  },
});

export const snackbarActions = snackbarSlice.actions;
export const snackbarReducer = snackbarSlice.reducer;
