import { Middleware } from 'redux';
import { io, Socket } from 'socket.io-client';
import { webSocketActions } from '../../features/web-socket/webSocketSlice';

let socket: Socket;

export const webSocketMiddleware: Middleware = (store) => (next) => (action) => {
  if (socket !== undefined && store.getState().webSocket.isConnected && webSocketActions.sendMessage.match(action)) {
    socket.emit('message', action.payload);
    return next(action);
  }

  if (socket !== undefined || !webSocketActions.startConnecting.match(action)) {
    return next(action);
  }

  socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket'] });

  socket.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('Socket.io connected');
    store.dispatch(webSocketActions.connectionEstablished());
  });

  socket.on('message', (message) => {
    store.dispatch(webSocketActions.receiveMessage(message));
  });

  next(action);
};
