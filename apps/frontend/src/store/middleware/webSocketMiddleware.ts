import {
  WebSocketBuildImageLogs,
  WebSocketContainerLogs,
  WebSocketCreateContainerResponse,
  WebSocketMessage, WebSocketRequestEvents,
  WebSocketResponseEvents,
} from 'common-src';
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { io, Socket } from 'socket.io-client';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';
import { containersActions, createContainerRequest } from '../../features/container/containersSlice';
import { Container } from '../../types/models/containerType';

let socket: Socket;

// TODO: Move this and all web socket request actions to proper place (maybe features/web-socket?)
const webSocketRequests = [
  webSocketActions.sendMessage,
  createContainerRequest,
];

const webSocketEvents = {
  [createContainerRequest.type]: WebSocketRequestEvents.CreateContainerRequest,
  [webSocketActions.sendMessage.type]: WebSocketRequestEvents.ContainerLogsRequest,
};

function getWebSocketEvent(actionType: string) {
  return webSocketEvents[actionType];
}

function isSocketConnected(socket: Socket, store: MiddlewareAPI<Dispatch<AnyAction>>) {
  return socket !== undefined && store.getState().webSocket.isConnected;
}

function isWebSocketRequestAction(action: AnyAction) {
  return webSocketRequests.some((r) => r.match(action));
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
    store.dispatch(webSocketActions.connectionEstablished());
  });

  socket.on('message', (message: WebSocketMessage) => {
    if (message.event === WebSocketResponseEvents.CreateContainerResponse) {
      const castMessage = message as WebSocketCreateContainerResponse;
      store.dispatch(containersActions.createContainerFulfilled(castMessage.container));
    } else if (message.event === WebSocketResponseEvents.BuildImageLogs) {
      const castMessage = message as WebSocketBuildImageLogs;
      store.dispatch(webSocketActions.buildLogs(castMessage));
    } else {
      const castMessage = message as WebSocketContainerLogs;
      store.dispatch(webSocketActions.receiveMessage(castMessage));
    }
  });

  next(action);
};
