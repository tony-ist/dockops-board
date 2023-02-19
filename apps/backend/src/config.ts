import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const dockerSockPath = process.env.DOCKER_SOCK_PATH ?? '/var/run/docker.sock';
export const port = parseInt(process.env.PORT ?? '3000');
export const nodeEnv = process.env.NODE_ENV ?? 'PRODUCTION';
export const databaseUrl = process.env.DATABASE_URL;
export const serveStatic = process.env.SERVE_STATIC ?? 'TRUE';
