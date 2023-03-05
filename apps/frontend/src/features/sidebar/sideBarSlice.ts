import { createSlice } from '@reduxjs/toolkit';

export interface SideBarState {
  isOpen: boolean;
}

const initialState: SideBarState = {
  isOpen: true,
};

const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const sideBarActions = sideBarSlice.actions;
export const sideBarReducer = sideBarSlice.reducer;
