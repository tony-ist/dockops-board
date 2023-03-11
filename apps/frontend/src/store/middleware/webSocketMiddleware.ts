import { WebSocketResponseEvents, WSResponseMessage } from 'common-src';
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
import type { AppSocket } from '../../types/appSocketIOTypes';

let socket: AppSocket;

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
    console.error(`Unsupported WebSocket action: "${JSON.stringify(action, null, 2)}".`);
    return next(action);
  }

  if (isSocketConnected(socket, store) && isWebSocketRequestAction(action)) {
    const jwtToken = localStorage.getItem('jwtToken');
    const event = getWebSocketEvent(action.type);

    if (!jwtToken) {
      // eslint-disable-next-line no-console
      console.error('No JWT token in local storage, web socket requests will fail.');
    }

    socket.emit(event, {
      jwtToken: jwtToken ?? 'No JWT token provided',
      ...action.payload,
    });

    return next(action);
  }

  if (isStartConnectingAction(socket, action)) {
    return next(action);
  }

  // eslint-disable-next-line no-console
  console.log('Connecting to websocket...');

  socket = io(import.meta.env.VITE_BACKEND_URL, {
    auth: {
      token: localStorage.getItem('jwtToken'),
    },
    transports: ['websocket'],
  });

  socket.on('connect_error', (error) => {
    // eslint-disable-next-line no-console
    console.error('WebSocket connect error:', error);
  });

  socket.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log(`Socket.io connected with id "${socket.id}".`);
    document.cookie = `socketId=${socket.id}; Path=/; SameSite=Lax`;
    store.dispatch(webSocketActions.connectionEstablished());
  });

  (Object.keys(WebSocketResponseEvents) as Array<keyof typeof WebSocketResponseEvents>).forEach((responseEvent) => {
    // TODO: Proper type for WSResponseMessage instead of any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on(WebSocketResponseEvents[responseEvent], (message: WSResponseMessage<any>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let actionCreator: ActionCreatorWithOptionalPayload<any>;

      if (message.error) {
        actionCreator = errorActionsByResponseEvents[responseEvent];
      } else {
        actionCreator = actionsByResponseEvents[responseEvent];
      }

      if (actionCreator !== undefined) {
        store.dispatch(actionCreator(message));
        return;
      }

      const errorMessage = `Unknown event type ${responseEvent} for web socket message ${message}.`;
      // eslint-disable-next-line no-console
      console.error(errorMessage);
      // TODO: Use MUI Alert
      window.alert(errorMessage);
    });
  });

  next(action);
};
