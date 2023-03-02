import { Socket } from 'socket.io';

export class SocketManager {
  private socketsByIds = new Map<string, Socket>();

  public get(id: string) {
    return this.socketsByIds.get(id);
  }

  public set(socket: Socket) {
    this.socketsByIds.set(socket.id, socket);
  }
}
