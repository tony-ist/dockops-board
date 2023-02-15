import Docker, {HostConfig} from 'dockerode';

// TODO: handle connection to docker
const docker = new Docker();

export function start() {
    console.log('hello world');
}

start();
