import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const dockerSockPath = process.env.DOCKER_SOCK_PATH ?? '/var/run/docker.sock';
export const port = parseInt(process.env.PORT ?? '3000');
export const nodeEnv = process.env.NODE_ENV ?? 'PRODUCTION';
export const sqliteURL = process.env.SQLITE_URL ?? 'file:/etc/dockerops-board/db/production.db';
export const serveStatic = process.env.SERVE_STATIC ?? 'TRUE';
export const temporaryDirectoryPath = process.env.TEMPORARY_DIRECTORY_PATH ?? '/etc/dockerops-board/repos';
export const frontendURL = process.env.FRONTEND_URL ?? 'http://localhost:5173';
export const secret = process.env.SECRET;
export const bcryptSaltWorkFactor = parseInt(process.env.BCRYPT_SALT_WORK_FACTOR ?? '12');
export const jwtExpiration = process.env.JWT_EXPIRATION ?? '30d';
