import { createSlice } from '@reduxjs/toolkit';

export interface CreateNewContainerModalSlice {
  isOpen: boolean;
}

const initialState: CreateNewContainerModalSlice = {
  isOpen: false,
};

const createNewContainerModalSlice = createSlice({
  name: 'createNewContainerModal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const createNewContainerModalActions = createNewContainerModalSlice.actions;
export const createNewContainerModalReducer = createNewContainerModalSlice.reducer;
