import { Socket } from 'socket.io';

export class SocketManager {
  private socket: Socket | null = null;

  public get() {
    return this.socket;
  }

  public set(stream: Socket) {
    this.socket = stream;
  }
}
