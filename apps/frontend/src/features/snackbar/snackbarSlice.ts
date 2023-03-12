import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { startContainerThunk, stopContainerThunk } from '../container/updateContainerSlice';

interface SnackbarState {
  isOpen: boolean;
  message: string | null;
}

const initialState: SnackbarState = {
  isOpen: false,
  message: null,
};

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
        state.message = JSON.stringify(action.meta.message);
      })
      .addCase(stopContainerThunk.rejected, (state, action) => {
        state.isOpen = true;
        state.message = `Update container error: ${action.meta.message}`;
      });
  },
});

export const snackbarActions = snackbarSlice.actions;
export const snackbarReducer = snackbarSlice.reducer;
