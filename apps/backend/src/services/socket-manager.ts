// TODO: Clean up sockets
import type { AppSocket } from '../types/app-socket-io-types';

export class SocketManager {
  private socketsByIds = new Map<string, AppSocket>();

  public get(id: string) {
    return this.socketsByIds.get(id);
  }

  public set(socket: AppSocket) {
    this.socketsByIds.set(socket.id, socket);
  }
}
