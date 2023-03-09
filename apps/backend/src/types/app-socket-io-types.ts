import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from 'common-src';
import { Server, Socket } from 'socket.io';

export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type AppIOServer = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
