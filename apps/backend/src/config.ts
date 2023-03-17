import dotenv from 'dotenv';

function loadDotEnv(dotEnvFilePath: string) {
  dotenv.config({ path: dotEnvFilePath });
}

if (process.env.NODE_ENV === 'TEST') {
  loadDotEnv('.env.test');
} else if (process.env.NODE_ENV === 'PRODUCTION') {
  // We use docker's environment variables in production
} else {
  // Load development config by default
  loadDotEnv('.env.local');
}

export const config = ({
  dockerSockPath: process.env.DOCKER_SOCK_PATH ?? '/var/run/docker.sock',
  port: parseInt(process.env.PORT ?? '3000'),
  nodeEnv: process.env.NODE_ENV ?? 'PRODUCTION',
  sqliteURL: process.env.SQLITE_URL ?? 'file:/etc/dockerops-board/db/production.db?connection_limit=1',
  serveStatic: process.env.SERVE_STATIC ?? 'TRUE',
  temporaryDirectoryPath: process.env.TEMPORARY_DIRECTORY_PATH ?? '/etc/dockerops-board/repos',
  frontendURL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  secret: process.env.SECRET,
  bcryptSaltWorkFactor: parseInt(process.env.BCRYPT_SALT_WORK_FACTOR ?? '12'),
  jwtExpiration: process.env.JWT_EXPIRATION ?? '30d',
});
