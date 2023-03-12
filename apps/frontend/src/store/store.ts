import { configureStore } from '@reduxjs/toolkit';
import { webSocketMiddleware } from './middleware/webSocketMiddleware';
import { webSocketReducer } from '../features/web-socket/webSocketSlice';
import { createContainerReducer } from '../features/container/createContainerSlice';
import { sideBarReducer } from '../features/sidebar/sideBarSlice';
import { containersReducer } from '../features/container/containersSlice';
import { containerLogsReducer } from '../features/container/containerLogsSlice';
import { jwtTokenMiddleware } from './middleware/jwtTokenMiddleware';
import { loginReducer } from '../features/login/loginSlice';
import { getContainerReducer } from '../features/container/getContainerSlice';
import { buildImageLogsReducer } from '../features/container/buildImageLogsSlice';
import { updateContainerReducer } from '../features/container/updateContainerSlice';

export const store = configureStore({
  reducer: {
    containers: containersReducer,
    getContainer: getContainerReducer,
    createContainer: createContainerReducer,
    updateContainer: updateContainerReducer,
    containerLogs: containerLogsReducer,
    buildLogs: buildImageLogsReducer,
    webSocket: webSocketReducer,
    sideBar: sideBarReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware).concat(jwtTokenMiddleware),
});
