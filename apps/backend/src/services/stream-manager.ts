import ReadableStream = NodeJS.ReadableStream;

export class StreamManager {
  private stream: ReadableStream | null = null;

  public get() {
    return this.stream;
  }

  public set(stream: ReadableStream) {
    this.stream = stream;
  }
}
