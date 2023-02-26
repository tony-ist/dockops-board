import { configureStore } from '@reduxjs/toolkit';

import { containerListReducer } from '../features/container-list/containerListSlice';
import { webSocketMiddleware } from './middleware/webSocketMiddleware';
import { webSocketReducer } from '../features/web-socket/webSocketSlice';
import { newContainerReducer } from '../features/container-new/newContainerSlice';

export const store = configureStore({
  reducer: {
    containerList: containerListReducer,
    newContainer: newContainerReducer,
    webSocket: webSocketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
