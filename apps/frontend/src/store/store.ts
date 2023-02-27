import { configureStore } from '@reduxjs/toolkit';

import { containerListReducer } from '../features/container-list/containerListSlice';
import { webSocketMiddleware } from './middleware/webSocketMiddleware';
import { webSocketReducer } from '../features/web-socket/webSocketSlice';
import { createContainerReducer } from '../features/container-new/createContainerSlice';

export const store = configureStore({
  reducer: {
    containerList: containerListReducer,
    createContainer: createContainerReducer,
    webSocket: webSocketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
