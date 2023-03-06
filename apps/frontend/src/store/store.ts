import { configureStore } from '@reduxjs/toolkit';
import { webSocketMiddleware } from './middleware/webSocketMiddleware';
import { webSocketReducer } from '../features/web-socket/webSocketSlice';
import { createContainerReducer } from '../features/container/createContainerSlice';
import { sideBarReducer } from '../features/sidebar/sideBarSlice';
import { containersReducer } from '../features/container/containersSlice';
import { containerLogsReducer } from '../features/web-socket/containerLogsSlice';
import { createNewContainerModalReducer } from '../features/create-new-container-modal/createNewContainerModalSlice';

export const store = configureStore({
  reducer: {
    containers: containersReducer,
    createContainer: createContainerReducer,
    containerLogs: containerLogsReducer,
    webSocket: webSocketReducer,
    sideBar: sideBarReducer,
    createNewContainerModal: createNewContainerModalReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware),
});
