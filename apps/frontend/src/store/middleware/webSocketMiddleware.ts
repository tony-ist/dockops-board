import {
  WebSocketCreateContainerResponse,
  WebSocketLogs,
  WebSocketMessage,
  WebSocketResponseEvents,
} from 'common-src';
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { io, Socket } from 'socket.io-client';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';
import { containersActions } from '../../features/container/containersSlice';
import { webSocketEventsByAction, webSocketRequestActions } from '../../features/web-socket/webSocketActions';
import { containerLogsActions } from '../../features/web-socket/containerLogsSlice';

let socket: Socket;

function getWebSocketEvent(actionType: string) {
  return webSocketEventsByAction[actionType];
}

function isSocketConnected(socket: Socket, store: MiddlewareAPI<Dispatch<AnyAction>>) {
  return socket !== undefined && store.getState().webSocket.isConnected;
}

function isWebSocketRequestAction(action: AnyAction) {
  return webSocketRequestActions.some((r) => r.match(action));
}

function isStartConnectingAction(socket: Socket, action: AnyAction) {
  return socket !== undefined || !webSocketActions.startConnecting.match(action);
}

export const webSocketMiddleware: Middleware = (store) => (next) => (action) => {
  if (isSocketConnected(socket, store) && isWebSocketRequestAction(action)) {
    socket.emit('message', {
      event: getWebSocketEvent(action.type),
      ...action.payload,
    });
    return next(action);
  }

  if (isStartConnectingAction(socket, action)) {
    return next(action);
  }

  socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket'] });

  socket.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('Socket.io connected');
    document.cookie = `socketId=${socket.id};SameSite=None;Secure`;
    store.dispatch(webSocketActions.connectionEstablished());
  });

  socket.on('message', (message: WebSocketMessage) => {
    // TODO: Use object to dispatch needed action instead of if-else
    if (message.event === WebSocketResponseEvents.CreateContainerResponse) {
      const castMessage = message as WebSocketCreateContainerResponse;
      store.dispatch(containersActions.createContainerFulfilled(castMessage.container));
    } else if (message.event === WebSocketResponseEvents.BuildImageLogs) {
      const castMessage = message as WebSocketLogs;
      store.dispatch(containerLogsActions.receiveBuildLogs(castMessage));
    } else if (message.event === WebSocketResponseEvents.ContainerLogs) {
      const castMessage = message as WebSocketLogs;
      store.dispatch(containerLogsActions.receiveContainerLogs(castMessage));
    }
  });

  next(action);
};
