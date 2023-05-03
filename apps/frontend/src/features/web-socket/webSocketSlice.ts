import { createAction, createSlice } from '@reduxjs/toolkit';
import { loginActions } from '../login/loginSlice';

export interface WebSocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: WebSocketState = {
  isEstablishingConnection: false,
  isConnected: false,
};

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginActions.logout, () => initialState);
  },
});

const unsupported = createAction('websocket/unsupported');

export const webSocketActions = {
  unsupported,
  ...webSocketSlice.actions,
};
export const webSocketReducer = webSocketSlice.reducer;
