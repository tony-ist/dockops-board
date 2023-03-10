export enum DockerEventAction {
  Create = 'create',
  Start = 'start',
  Stop = 'stop',
  Die = 'die',
  Destroy = 'destroy',
}

export interface DockerEvent {
  status: string;
  id: string;
  from: string; // Image name
  Type: string;
  Action: DockerEventAction;
  time: number;
}
