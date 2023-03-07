import { Socket } from 'socket.io';

// TODO: Clean up sockets
export class SocketManager {
  private socketsByIds = new Map<string, Socket>();

  public get(id: string) {
    return this.socketsByIds.get(id);
  }

  public set(socket: Socket) {
    this.socketsByIds.set(socket.id, socket);
  }
}
