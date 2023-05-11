import { ClientToServerEvents, ServerToClientEvents } from 'common-src';
import { Socket } from 'socket.io-client';

export type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
