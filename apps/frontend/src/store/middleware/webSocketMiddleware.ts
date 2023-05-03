import { WebSocketResponseEvents, WSResponseMessage } from 'common-src';
import { AnyAction, Middleware } from 'redux';
import { io } from 'socket.io-client';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';
import {
  actionsByResponseEvents,
  errorActionsByResponseEvents,
  webSocketRequestActions,
  webSocketRequestEventsByActionType,
} from '../../features/web-socket/webSocketActions';
import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';
import type { AppSocket } from '../../types/appSocketIOTypes';
import { loginActions } from '../../features/login/loginSlice';

let socket: AppSocket | null = null;

function getWebSocketEvent(actionType: string) {
  return webSocketRequestEventsByActionType[actionType];
}

function isSocketConnected(socket: AppSocket | null): socket is AppSocket {
  return socket !== null;
}

function isWebSocketRequestAction(action: AnyAction) {
  return webSocketRequestActions.some((r) => r.match(action));
}

function shouldStartConnecting(action: AnyAction) {
  return webSocketActions.startConnecting.match(action);
}

function isWSUnsupportedAction(action: AnyAction) {
  return webSocketActions.unsupported.match(action);
}

function stringify(obj: object | null) {
  return JSON.stringify(obj, null, 2);
}

export const webSocketMiddleware: Middleware = (store) => (next) => (action) => {
  if (isWSUnsupportedAction(action)) {
    // eslint-disable-next-line no-console
    console.error(`Unsupported WebSocket action: "${stringify(action)}".`);
    return next(action);
  }

  if (isSocketConnected(socket) && isWebSocketRequestAction(action)) {
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

  if (!shouldStartConnecting(action)) {
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

    if (error.message.startsWith('AuthorizationError')) {
      // eslint-disable-next-line no-console
      console.log('Dispatching logout action...');
      socket = null;
      store.dispatch(loginActions.logout());
    }
  });

  socket.on('connect', () => {
    if (!isSocketConnected(socket)) {
      // eslint-disable-next-line no-console
      console.error(`Impossible state: socket is not connected in on connect hook. Socket: "${socket}".".`);
      return;
    }

    // eslint-disable-next-line no-console
    console.log(`Socket.io connected with id "${socket.id}".`);
    document.cookie = `socketId=${socket.id}; Path=/; SameSite=Lax`;
    store.dispatch(webSocketActions.connectionEstablished());
  });

  socket.onAny((event, ...args) => {
    if (Object.keys(WebSocketResponseEvents).includes(event)) {
      return;
    }

    // eslint-disable-next-line no-console
    console.error(`Websocket received unknown event type "${event}" with args "${stringify(args)}".`);
  });

  (Object.keys(WebSocketResponseEvents) as Array<keyof typeof WebSocketResponseEvents>).forEach((responseEvent) => {
    if (!isSocketConnected(socket)) {
      // eslint-disable-next-line no-console
      console.error(`Impossible state: socket is not connected in on "${responseEvent}" hook. Socket: "${socket}".`);
      return;
    }

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

      // eslint-disable-next-line no-console
      console.error(`No action creator found for event "${responseEvent}", message "${stringify(message)}"`);
    });
  });

  return next(action);
};
