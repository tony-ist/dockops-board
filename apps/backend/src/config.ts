import dotenv from 'dotenv';

dotenv.config();

export const dockerSockPath =
  process.env.DOCKER_SOCK_PATH ?? '/var/run/docker.sock';
export const port = parseInt(process.env.PORT ?? '3001');
