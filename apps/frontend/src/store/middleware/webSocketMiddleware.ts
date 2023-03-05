import { WebSocketMessage, WebSocketResponseEvents } from 'common-src';
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { io, Socket } from 'socket.io-client';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';
import {
  actionsByResponseEvents,
  webSocketEventsByAction,
  webSocketRequestActions,
} from '../../features/web-socket/webSocketActions';

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
    const actionCreator = actionsByResponseEvents[message.event as WebSocketResponseEvents];

    if (actionCreator !== undefined) {
      store.dispatch(actionCreator(message));
      return;
    }

    const errorMessage = `Unknown event type ${message.event} for web socket message ${message}.`;
    // eslint-disable-next-line no-console
    console.error(errorMessage);
    window.alert(errorMessage);
  });

  next(action);
};
