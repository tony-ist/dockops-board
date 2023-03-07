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
import { startContainerReducer } from '../features/container/startContainerSlice';
import { stopContainerReducer } from '../features/container/stopContainerSlice';

export const store = configureStore({
  reducer: {
    containers: containersReducer,
    getContainer: getContainerReducer,
    createContainer: createContainerReducer,
    startContainer: startContainerReducer,
    stopContainer: stopContainerReducer,
    containerLogs: containerLogsReducer,
    webSocket: webSocketReducer,
    sideBar: sideBarReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware).concat(jwtTokenMiddleware),
});
