import { WebSocketMessage, WebSocketResponseEvents } from 'common-src';
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { io, Socket } from 'socket.io-client';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';
import {
  actionsByResponseEvents,
  errorActionsByResponseEvents,
  webSocketRequestActions,
  webSocketRequestEventsByActionType,
} from '../../features/web-socket/webSocketActions';
import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';

let socket: Socket;

function getWebSocketEvent(actionType: string) {
  return webSocketRequestEventsByActionType[actionType];
}

function isSocketConnected(socket: Socket, store: MiddlewareAPI<Dispatch>) {
  return socket !== undefined && store.getState().webSocket.isConnected;
}

function isWebSocketRequestAction(action: AnyAction) {
  return webSocketRequestActions.some((r) => r.match(action));
}

function isStartConnectingAction(socket: Socket, action: AnyAction) {
  return socket !== undefined || !webSocketActions.startConnecting.match(action);
}

function isWSUnsupportedAction(action: AnyAction) {
  return webSocketActions.unsupported.match(action);
}

export const webSocketMiddleware: Middleware = (store) => (next) => (action) => {
  if (isWSUnsupportedAction(action)) {
    // eslint-disable-next-line no-console
    console.error(`Unsupported WebSocket action: "${action}".`);
    return next(action);
  }

  if (isSocketConnected(socket, store) && isWebSocketRequestAction(action)) {
    socket.emit('message', {
      jwtToken: localStorage.getItem('jwtToken'),
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
    console.log(`Socket.io connected with id "${socket.id}".`);
    document.cookie = `socketId=${socket.id};Path=/;SameSite=None;Secure`;
    store.dispatch(webSocketActions.connectionEstablished());
  });

  socket.on('message', (message: WebSocketMessage) => {
    if (message.event === WebSocketResponseEvents.ErrorResponse) {
      // eslint-disable-next-line no-console
      console.error('WebSocket error:', message.error);
    }

    let actionCreator: ActionCreatorWithOptionalPayload<any>;

    if (message.error) {
      actionCreator = errorActionsByResponseEvents[message.event as WebSocketResponseEvents];
    } else {
      actionCreator = actionsByResponseEvents[message.event as WebSocketResponseEvents];
    }

    if (actionCreator !== undefined) {
      store.dispatch(actionCreator(message));
      return;
    }

    const errorMessage = `Unknown event type ${message.event} for web socket message ${message}.`;
    // eslint-disable-next-line no-console
    console.error(errorMessage);
    // TODO: Use MUI Alert
    window.alert(errorMessage);
  });

  next(action);
};
